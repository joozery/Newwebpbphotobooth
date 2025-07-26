const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all products with related data
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      p.*,
      GROUP_CONCAT(DISTINCT pf.feature_text ORDER BY pf.feature_order SEPARATOR '||') as features,
      GROUP_CONCAT(DISTINCT pts.spec_text ORDER BY pts.spec_order SEPARATOR '||') as technical_specs,
      GROUP_CONCAT(DISTINCT pdi.image_url ORDER BY pdi.image_order SEPARATOR '||') as detail_images
    FROM products p
    LEFT JOIN product_features pf ON p.id = pf.product_id
    LEFT JOIN product_technical_specs pts ON p.id = pts.product_id
    LEFT JOIN product_detail_images pdi ON p.id = pdi.product_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // แปลงข้อมูลกลับเป็น array
    const products = result.map(product => ({
      ...product,
      features: product.features ? product.features.split('||') : [],
      technical_specs: product.technical_specs ? product.technical_specs.split('||') : [],
      detail_images: product.detail_images ? product.detail_images.split('||') : []
    }));
    
    res.json(products);
  });
});

// GET single product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      p.*,
      GROUP_CONCAT(DISTINCT pf.feature_text ORDER BY pf.feature_order SEPARATOR '||') as features,
      GROUP_CONCAT(DISTINCT pts.spec_text ORDER BY pts.spec_order SEPARATOR '||') as technical_specs,
      GROUP_CONCAT(DISTINCT pdi.image_url ORDER BY pdi.image_order SEPARATOR '||') as detail_images
    FROM products p
    LEFT JOIN product_features pf ON p.id = pf.product_id
    LEFT JOIN product_technical_specs pts ON p.id = pts.product_id
    LEFT JOIN product_detail_images pdi ON p.id = pdi.product_id
    WHERE p.id = ?
    GROUP BY p.id
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Product not found' });
    
    const product = result[0];
    product.features = product.features ? product.features.split('||') : [];
    product.technical_specs = product.technical_specs ? product.technical_specs.split('||') : [];
    product.detail_images = product.detail_images ? product.detail_images.split('||') : [];
    
    res.json(product);
  });
});

// POST: Add new product
router.post('/', (req, res) => {
  const {
    title, description, price, priceDetails, category, status,
    features, technicalSpecs, main_image_url, detail_images
  } = req.body;

  console.log('Received product data:', req.body);

  // เริ่ม transaction
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    // เพิ่มข้อมูลสินค้าหลัก
    const productSql = `
      INSERT INTO products 
      (title, description, price, price_details, category, status, main_image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(productSql, [
      title, description, price, priceDetails, category, status, main_image_url
    ], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error('Error inserting product:', err);
          res.status(500).json({ error: err.message });
        });
      }

      const productId = result.insertId;
      console.log('Product created with ID:', productId);

      // เพิ่มคุณสมบัติ
      if (features && features.length > 0) {
        const featureValues = features.map((feature, index) => [productId, feature, index + 1]);
        const featureSql = 'INSERT INTO product_features (product_id, feature_text, feature_order) VALUES ?';
        
        db.query(featureSql, [featureValues], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting features:', err);
              res.status(500).json({ error: err.message });
            });
          }
          console.log('Features inserted successfully');
        });
      }

      // เพิ่มข้อมูลทางเทคนิค
      if (technicalSpecs && technicalSpecs.length > 0) {
        const specValues = technicalSpecs.map((spec, index) => [productId, spec, index + 1]);
        const specSql = 'INSERT INTO product_technical_specs (product_id, spec_text, spec_order) VALUES ?';
        
        db.query(specSql, [specValues], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting technical specs:', err);
              res.status(500).json({ error: err.message });
            });
          }
          console.log('Technical specs inserted successfully');
        });
      }

      // เพิ่มรูปภาพรายละเอียด
      if (detail_images && detail_images.length > 0) {
        const imageValues = detail_images.map((image, index) => [productId, image, index + 1]);
        const imageSql = 'INSERT INTO product_detail_images (product_id, image_url, image_order) VALUES ?';
        
        db.query(imageSql, [imageValues], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting detail images:', err);
              res.status(500).json({ error: err.message });
            });
          }
          console.log('Detail images inserted successfully');
        });
      }

      // Commit transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error committing transaction:', err);
            res.status(500).json({ error: err.message });
          });
        }
        console.log('Transaction committed successfully');
        res.json({ id: productId, message: 'Product created successfully' });
      });
    });
  });
});

// PUT: Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    title, description, price, priceDetails, category, status,
    features, technicalSpecs, main_image_url, detail_images
  } = req.body;

  console.log('Updating product ID:', id);
  console.log('Update data:', req.body);

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    // อัพเดทข้อมูลสินค้าหลัก
    const productSql = `
      UPDATE products 
      SET title = ?, description = ?, price = ?, price_details = ?, 
          category = ?, status = ?, main_image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.query(productSql, [
      title, description, price, priceDetails, category, status, main_image_url, id
    ], (err) => {
      if (err) {
        return db.rollback(() => {
          console.error('Error updating product:', err);
          res.status(500).json({ error: err.message });
        });
      }

      console.log('Product updated successfully');

      // ลบข้อมูลเก่า
      db.query('DELETE FROM product_features WHERE product_id = ?', [id], (err) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error deleting features:', err);
            res.status(500).json({ error: err.message });
          });
        }

        db.query('DELETE FROM product_technical_specs WHERE product_id = ?', [id], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error deleting technical specs:', err);
              res.status(500).json({ error: err.message });
            });
          }

          db.query('DELETE FROM product_detail_images WHERE product_id = ?', [id], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error deleting detail images:', err);
                res.status(500).json({ error: err.message });
              });
            }

            // เพิ่มข้อมูลใหม่
            let completedOperations = 0;
            const totalOperations = (features && features.length > 0 ? 1 : 0) + 
                                  (technicalSpecs && technicalSpecs.length > 0 ? 1 : 0) + 
                                  (detail_images && detail_images.length > 0 ? 1 : 0);

            const checkCompletion = () => {
              completedOperations++;
              if (completedOperations >= totalOperations) {
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error('Error committing transaction:', err);
                      res.status(500).json({ error: err.message });
                    });
                  }
                  console.log('Update transaction committed successfully');
                  res.json({ message: 'Product updated successfully' });
                });
              }
            };

            // เพิ่มคุณสมบัติ
            if (features && features.length > 0) {
              const featureValues = features.map((feature, index) => [id, feature, index + 1]);
              db.query('INSERT INTO product_features (product_id, feature_text, feature_order) VALUES ?', [featureValues], (err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Error inserting features:', err);
                    res.status(500).json({ error: err.message });
                  });
                }
                console.log('Features updated successfully');
                checkCompletion();
              });
            } else {
              checkCompletion();
            }

            // เพิ่มข้อมูลทางเทคนิค
            if (technicalSpecs && technicalSpecs.length > 0) {
              const specValues = technicalSpecs.map((spec, index) => [id, spec, index + 1]);
              db.query('INSERT INTO product_technical_specs (product_id, spec_text, spec_order) VALUES ?', [specValues], (err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Error inserting technical specs:', err);
                    res.status(500).json({ error: err.message });
                  });
                }
                console.log('Technical specs updated successfully');
                checkCompletion();
              });
            } else {
              checkCompletion();
            }

            // เพิ่มรูปภาพรายละเอียด
            if (detail_images && detail_images.length > 0) {
              const imageValues = detail_images.map((image, index) => [id, image, index + 1]);
              db.query('INSERT INTO product_detail_images (product_id, image_url, image_order) VALUES ?', [imageValues], (err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Error inserting detail images:', err);
                    res.status(500).json({ error: err.message });
                  });
                }
                console.log('Detail images updated successfully');
                checkCompletion();
              });
            } else {
              checkCompletion();
            }
          });
        });
      });
    });
  });
});

// DELETE product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    // ลบข้อมูลที่เกี่ยวข้อง (จะถูกลบอัตโนมัติเพราะมี CASCADE)
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      }
      
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message });
          });
        }
        res.json({ message: 'Product deleted successfully' });
      });
    });
  });
});

module.exports = router; 