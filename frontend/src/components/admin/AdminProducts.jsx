import React, { useState, useEffect } from 'react';
import { 
  HiPlus, 
  HiTrash, 
  HiPencil, 
  HiEye, 
  HiEyeOff,
  HiUpload,
  HiCube,
  HiSearch,
  HiSave
} from 'react-icons/hi';
import { productAPI, uploadAPI } from '../../services/api';
import Notification from '../ui/Notification';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'success',
    message: ''
  });

  const categories = ['all', 'PhotoBooth', 'Video Booth', 'AI Services', 'Equipment'];

  // ฟังก์ชันสำหรับแสดง notification
  const showNotification = (type, message) => {
    setNotification({
      isVisible: true,
      type,
      message
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // แสดง notification เมื่อค้นหาไม่เจอ
  useEffect(() => {
    if (searchTerm && filteredProducts.length === 0 && products.length > 0) {
      showNotification('info', `ไม่พบสินค้าที่ตรงกับคำค้นหา: "${searchTerm}"`);
    }
  }, [searchTerm, filteredProducts.length, products.length]);

  const handleEdit = (product) => {
    console.log('Editing product data:', product);
    console.log('Product features:', product?.features);
    console.log('Product technical_specs:', product?.technical_specs);
    setEditingProduct(product);
    setShowModal(true);
  };

  // ดึงข้อมูลสินค้าทั้งหมด
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 AdminProducts: เริ่มดึงข้อมูลสินค้า...');
      const response = await productAPI.getAllProducts();
      console.log('✅ AdminProducts: ได้ข้อมูลสินค้าแล้ว:', response.data);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('❌ AdminProducts: Error fetching products:', err);
      
      // ถ้า API ไม่ทำงาน ให้ใช้ข้อมูลตัวอย่าง
      if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
        console.log('⚠️ AdminProducts: ใช้ข้อมูลตัวอย่างเนื่องจาก API ไม่ทำงาน');
        
        // ข้อมูลตัวอย่าง
        const sampleProducts = [
          {
            id: 1,
            title: 'PhotoBooth พรีเมียม',
            description: 'บริการ PhotoBooth สำหรับงานแต่งงานและงานพิเศษ',
            price: '15,000',
            price_details: '• ครึ่งวันงาน (4 ชั่วโมง)\n• รวมทีมงาน 2 คน\n• รวมค่าเดินทางใน กทม.',
            category: 'PhotoBooth',
            status: 'active',
            features: ['พิมพ์ภาพทันที', 'กรอบสวยงาม', 'เอฟเฟกต์พิเศษ'],
            technical_specs: ['กล้อง DSLR', 'เครื่องพิมพ์ 6x4', 'แสงสตูดิโอ'],
            main_image_url: '/src/assets/photobooth.jpg',
            detail_images: ['/src/assets/photobooth.jpg'],
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:00:00Z'
          },
          {
            id: 2,
            title: 'Video Booth 360°',
            description: 'บริการถ่ายวิดีโอ 360 องศา สำหรับงานพิเศษ',
            price: '25,000',
            price_details: '• เต็มวันงาน (8 ชั่วโมง)\n• รวมทีมงาน 3 คน\n• รวมค่าเดินทางใน กทม.',
            category: 'Video Booth',
            status: 'active',
            features: ['ถ่ายวิดีโอ 360°', 'ตัดต่อทันที', 'เอฟเฟกต์พิเศษ'],
            technical_specs: ['กล้อง 360°', 'คอมพิวเตอร์ตัดต่อ', 'แสงสตูดิโอ'],
            main_image_url: '/src/assets/360video.jpg',
            detail_images: ['/src/assets/360video.jpg'],
            created_at: '2024-01-16T10:00:00Z',
            updated_at: '2024-01-16T10:00:00Z'
          },
          {
            id: 3,
            title: 'AI Photo Enhancement',
            description: 'บริการปรับแต่งภาพด้วย AI เทคโนโลยีล่าสุด',
            price: '5,000',
            price_details: '• ปรับแต่งภาพ 100 ภาพ\n• ใช้เวลา 24 ชั่วโมง\n• ส่งไฟล์ผ่านอีเมล',
            category: 'AI Services',
            status: 'active',
            features: ['ปรับแต่งสีอัตโนมัติ', 'ลบจุดด่างดำ', 'ปรับความคมชัด'],
            technical_specs: ['AI Algorithm', 'GPU Processing', 'Cloud Storage'],
            main_image_url: '/src/assets/Aiphoto.jpg',
            detail_images: ['/src/assets/Aiphoto.jpg'],
            created_at: '2024-01-17T10:00:00Z',
            updated_at: '2024-01-17T10:00:00Z'
          }
        ];
        
        setProducts(sampleProducts);
        setError(null);
        showNotification('warning', 'ใช้ข้อมูลตัวอย่างเนื่องจากไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        setError('ไม่สามารถดึงข้อมูลสินค้าได้: ' + err.message);
        showNotification('error', 'ไม่สามารถดึงข้อมูลสินค้าได้: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // เพิ่มสินค้าใหม่
  const handleCreateProduct = async (productData) => {
    try {
      setUploading(true);
      
      console.log('=== handleCreateProduct ===');
      console.log('Received productData:', productData);
      console.log('productData type:', typeof productData);
      console.log('Is FormData:', productData instanceof FormData);
      
      // แยกข้อมูลและไฟล์
      const productInfo = {};
      let mainImageFile = null;
      let detailImageFiles = [];
      
      if (productData instanceof FormData) {
        for (let [key, value] of productData.entries()) {
          if (key === 'features' || key === 'technicalSpecs') {
            productInfo[key] = JSON.parse(value);
          } else if (key === 'mainImage') {
            mainImageFile = value;
          } else if (key === 'detailImages') {
            detailImageFiles.push(value);
          } else {
            productInfo[key] = value;
          }
        }
      } else {
        Object.assign(productInfo, productData);
        mainImageFile = productData.mainImageFile;
        detailImageFiles = productData.detailImageFiles || [];
      }
      
      console.log('=== Data Extraction Results ===');
      console.log('productInfo:', productInfo);
      console.log('mainImageFile:', mainImageFile);
      console.log('detailImageFiles:', detailImageFiles);

      // อัพโหลดรูปภาพหลัก
      let mainImageUrl = null;
      if (mainImageFile) {
        console.log('Uploading main image file:', mainImageFile);
        try {
          const mainImageResponse = await uploadAPI.uploadMainImage(mainImageFile);
          mainImageUrl = mainImageResponse.data.url;
          console.log('Main image uploaded successfully:', mainImageUrl);
        } catch (uploadErr) {
          console.error('Error uploading main image:', uploadErr);
          console.error('Upload error details:', uploadErr.response?.data);
          // ใช้รูปภาพ default หากอัพโหลดไม่สำเร็จ
          mainImageUrl = '/src/assets/photobooth.jpg';
        }
      } else {
        console.log('No main image file to upload');
      }

      // อัพโหลดรูปภาพรายละเอียด
      let detailImageUrls = [];
      if (detailImageFiles.length > 0) {
        console.log('Uploading detail image files:', detailImageFiles);
        try {
          const detailImagesResponse = await uploadAPI.uploadDetailImages(detailImageFiles);
          detailImageUrls = detailImagesResponse.data.urls;
          console.log('Detail images uploaded successfully:', detailImageUrls);
        } catch (uploadErr) {
          console.error('Error uploading detail images:', uploadErr);
          console.error('Upload error details:', uploadErr.response?.data);
          // ใช้รูปภาพ default หากอัพโหลดไม่สำเร็จ
          detailImageUrls = ['/src/assets/photobooth.jpg'];
        }
      } else {
        console.log('No detail image files to upload');
      }

      // สร้างข้อมูลสินค้าพร้อม URL รูปภาพ
      const finalProductData = {
        ...productInfo,
        main_image_url: mainImageUrl,
        detail_images: detailImageUrls
      };

      console.log('Sending product data to API:', finalProductData);

      // ส่งข้อมูลไป API
      const response = await productAPI.createProduct(finalProductData);
      console.log('Product created:', response.data);
      
      // รีเฟรชข้อมูล
      await fetchProducts();
      
      // ปิด modal
      setShowModal(false);
      
      // แสดงข้อความสำเร็จ
      showNotification('success', 'เพิ่มสินค้าสำเร็จ!');
    } catch (err) {
      console.error('Error creating product:', err);
      
      // ถ้า API ไม่ทำงาน ให้สร้างข้อมูลใน local state
      if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
        // แปลง FormData เป็น object
        const productInfo = {};
        if (productData instanceof FormData) {
          for (let [key, value] of productData.entries()) {
            if (key === 'features' || key === 'technicalSpecs') {
              productInfo[key] = JSON.parse(value);
            } else if (key !== 'mainImage' && key !== 'detailImages') {
              productInfo[key] = value;
            }
          }
        } else {
          Object.assign(productInfo, productData);
        }
        
        const newProduct = {
          id: products.length + 1,
          title: productInfo.title,
          description: productInfo.description,
          price_details: productInfo.priceDetails,
          price: productInfo.price,
          category: productInfo.category,
          status: productInfo.status,
          features: productInfo.features || [],
          technical_specs: productInfo.technicalSpecs || [],
          main_image_url: '/src/assets/photobooth.jpg',
          detail_images: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setProducts([...products, newProduct]);
        setShowModal(false);
        showNotification('success', 'เพิ่มสินค้าสำเร็จ! (ทำงานแบบ Offline)');
      } else {
        showNotification('error', 'เกิดข้อผิดพลาดในการเพิ่มสินค้า: ' + (err.response?.data?.error || err.message));
      }
    } finally {
      setUploading(false);
    }
  };

  // อัพเดทสินค้า
  const handleUpdateProduct = async (id, productData) => {
    try {
      setUploading(true);
      
      console.log('🔄 AdminProducts: เริ่มอัพเดทสินค้า ID:', id);
      console.log('📦 Product data received:', productData);
      
      // แยกข้อมูลและไฟล์
      const productInfo = {};
      let mainImageFile = null;
      let detailImageFiles = [];
      let shouldDeleteMainImage = false;
      let shouldDeleteDetailImages = false;
      
      if (productData instanceof FormData) {
        for (let [key, value] of productData.entries()) {
          if (key === 'features' || key === 'technicalSpecs') {
            productInfo[key] = JSON.parse(value);
          } else if (key === 'deleteMainImage') {
            shouldDeleteMainImage = value === 'true';
          } else if (key === 'deleteDetailImages') {
            shouldDeleteDetailImages = value === 'true';
          } else if (key === 'mainImage') {
            mainImageFile = value;
          } else if (key === 'detailImages') {
            detailImageFiles.push(value);
          } else {
            productInfo[key] = value;
          }
        }
      } else {
        Object.assign(productInfo, productData);
        mainImageFile = productData.mainImageFile;
        detailImageFiles = productData.detailImageFiles || [];
        shouldDeleteMainImage = productData.shouldDeleteMainImage || false;
        shouldDeleteDetailImages = productData.shouldDeleteDetailImages || false;
      }

      // หาสินค้าปัจจุบัน
      const currentProduct = products.find(p => p.id === id);
      console.log('📋 Current product:', currentProduct);

      // จัดการรูปภาพหลัก
      let mainImageUrl = currentProduct?.main_image_url || null;
      if (shouldDeleteMainImage) {
        // ผู้ใช้ต้องการลบรูปภาพหลัก
        console.log('🗑️ User wants to delete main image');
        mainImageUrl = null;
      } else
      if (mainImageFile) {
        // มีไฟล์ใหม่ ให้อัพโหลด
        console.log('📤 Uploading new main image...');
        try {
          const mainImageResponse = await uploadAPI.uploadMainImage(mainImageFile);
          mainImageUrl = mainImageResponse.data.url;
          console.log('✅ Main image uploaded successfully:', mainImageUrl);
        } catch (uploadErr) {
          console.error('❌ Error uploading main image:', uploadErr);
          // ใช้รูปภาพเดิมหากอัพโหลดไม่สำเร็จ
          mainImageUrl = currentProduct?.main_image_url || '/src/assets/photobooth.jpg';
        }
      } else {
        // ไม่มีไฟล์ใหม่ ใช้รูปภาพเดิม
        console.log('🔄 Using existing main image:', mainImageUrl);
      }

      // จัดการรูปภาพรายละเอียด
      let detailImageUrls = currentProduct?.detail_images || [];
      if (shouldDeleteDetailImages) {
        // ผู้ใช้ต้องการลบรูปภาพรายละเอียดทั้งหมด
        console.log('🗑️ User wants to delete all detail images');
        detailImageUrls = [];
      } else
      if (detailImageFiles.length > 0) {
        // มีไฟล์ใหม่ ให้อัพโหลด
        console.log('📤 Uploading new detail images...');
        try {
          const detailImagesResponse = await uploadAPI.uploadDetailImages(detailImageFiles);
          const newDetailImageUrls = detailImagesResponse.data.urls;
          // รวมรูปภาพเดิมกับรูปภาพใหม่
          detailImageUrls = [...detailImageUrls, ...newDetailImageUrls];
          console.log('✅ Detail images uploaded successfully:', newDetailImageUrls);
        } catch (uploadErr) {
          console.error('❌ Error uploading detail images:', uploadErr);
          // ใช้รูปภาพเดิมหากอัพโหลดไม่สำเร็จ
          detailImageUrls = currentProduct?.detail_images || ['/src/assets/photobooth.jpg'];
        }
      } else {
        // ไม่มีไฟล์ใหม่ ใช้รูปภาพเดิม
        console.log('🔄 Using existing detail images:', detailImageUrls);
      }

      // สร้างข้อมูลสินค้าพร้อม URL รูปภาพ
      const finalProductData = {
        ...productInfo,
        main_image_url: mainImageUrl,
        detail_images: detailImageUrls
      };

      console.log('📤 Sending updated product data to API:', finalProductData);

      await productAPI.updateProduct(id, finalProductData);
      console.log('✅ Product updated successfully');
      
      // รีเฟรชข้อมูล
      await fetchProducts();
      
      // ปิด modal
      setShowModal(false);
      
      showNotification('success', 'อัพเดทสินค้าสำเร็จ!');
    } catch (err) {
      console.error('❌ Error updating product:', err);
      
      // ถ้า API ไม่ทำงาน ให้อัพเดทใน local state
      if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
        // หาสินค้าปัจจุบัน (ต้องหาใหม่เพราะ currentProduct อาจจะไม่ได้ถูกประกาศใน scope นี้)
        const currentProduct = products.find(p => p.id === id);
        
        const productInfo = {};
        if (productData instanceof FormData) {
          for (let [key, value] of productData.entries()) {
            if (key === 'features' || key === 'technicalSpecs') {
              productInfo[key] = JSON.parse(value);
            } else if (key === 'deleteMainImage') {
              productInfo.shouldDeleteMainImage = value === 'true';
            } else if (key === 'deleteDetailImages') {
              productInfo.shouldDeleteDetailImages = value === 'true';
            } else if (key !== 'mainImage' && key !== 'detailImages') {
              productInfo[key] = value;
            }
          }
        } else {
          Object.assign(productInfo, productData);
        }
        
        // จัดการรูปภาพใน local state
        let mainImageUrl = currentProduct?.main_image_url;
        let detailImageUrls = currentProduct?.detail_images || [];
        
        console.log('🔍 Offline mode - Current product:', currentProduct);
        console.log('🔍 Offline mode - shouldDeleteMainImage:', productInfo.shouldDeleteMainImage);
        console.log('🔍 Offline mode - shouldDeleteDetailImages:', productInfo.shouldDeleteDetailImages);
        console.log('🔍 Offline mode - Original mainImageUrl:', mainImageUrl);
        console.log('🔍 Offline mode - Original detailImageUrls:', detailImageUrls);
        
        if (productInfo.shouldDeleteMainImage) {
          mainImageUrl = null;
          console.log('🗑️ Offline mode - Deleting main image, setting to null');
        }
        if (productInfo.shouldDeleteDetailImages) {
          detailImageUrls = [];
          console.log('🗑️ Offline mode - Deleting all detail images, setting to empty array');
        }
        
        console.log('🔍 Offline mode - Final mainImageUrl:', mainImageUrl);
        console.log('🔍 Offline mode - Final detailImageUrls:', detailImageUrls);
        
        setProducts(products.map(p => 
          p.id === id ? {
            ...p,
            title: productInfo.title,
            description: productInfo.description,
            price_details: productInfo.priceDetails,
            price: productInfo.price,
            category: productInfo.category,
            status: productInfo.status,
            features: productInfo.features || p.features,
            technical_specs: productInfo.technicalSpecs || p.technical_specs,
            main_image_url: mainImageUrl,
            detail_images: detailImageUrls,
            updated_at: new Date().toISOString()
          } : p
        ));
        
        setShowModal(false);
        showNotification('success', 'อัพเดทสินค้าสำเร็จ! (ทำงานแบบ Offline)');
      } else {
        showNotification('error', 'เกิดข้อผิดพลาดในการอัพเดทสินค้า: ' + (err.response?.data?.error || err.message));
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?')) {
      try {
        await productAPI.deleteProduct(id);
        console.log('Product deleted successfully');
        
        // รีเฟรชข้อมูล
        await fetchProducts();
        
        showNotification('success', 'ลบสินค้าสำเร็จ!');
      } catch (err) {
        console.error('Error deleting product:', err);
        
        // ถ้า API ไม่ทำงาน ให้ลบใน local state
        if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
          setProducts(products.filter(p => p.id !== id));
          showNotification('success', 'ลบสินค้าสำเร็จ! (ทำงานแบบ Offline)');
        } else {
          showNotification('error', 'เกิดข้อผิดพลาดในการลบสินค้า');
        }
      }
    }
  };

  const handleStatusToggle = async (id) => {
    try {
      const product = products.find(p => p.id === id);
      const newStatus = product.status === 'active' ? 'inactive' : 'active';
      
      // อัพเดทใน local state ก่อน
      setProducts(products.map(p => 
        p.id === id ? { ...p, status: newStatus } : p
      ));
      
      // แสดง notification
      showNotification('success', `เปลี่ยนสถานะสินค้าเป็น: ${newStatus === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`);
      
      // ถ้ามี backend ให้อัพเดทใน API ด้วย
      try {
        await productAPI.updateProduct(id, { status: newStatus });
      } catch (err) {
        console.log('API update failed, using local state only');
        showNotification('warning', 'อัพเดทสถานะในเซิร์ฟเวอร์ไม่สำเร็จ (ใช้ข้อมูลในเครื่อง)');
      }
    } catch (err) {
      console.error('Error toggling status:', err);
      showNotification('error', 'เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
    }
  };

  // โหลดข้อมูลเมื่อ component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // แสดง loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  // แสดง error หรือข้อมูลว่าง
  if (error || products.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">จัดการสินค้า/บริการ</h1>
            <p className="text-gray-600">เพิ่มและจัดการสินค้า/บริการทั้งหมด</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <HiPlus className="w-5 h-5" />
            เพิ่มสินค้าใหม่
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="max-w-md mx-auto">
            <HiCube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error ? 'ไม่สามารถดึงข้อมูลสินค้าได้' : 'ยังไม่มีสินค้า'}
            </h3>
            <p className="text-gray-600 mb-6">
              {error 
                ? 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' 
                : 'เริ่มต้นด้วยการเพิ่มสินค้า/บริการแรกของคุณ'
              }
            </p>
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors mx-auto"
            >
              <HiPlus className="w-5 h-5" />
              เพิ่มสินค้าแรก
            </button>
          </div>
        </div>

        {/* Upload/Edit Modal */}
        {showModal && (
          <ProductModal 
            product={editingProduct} 
            onClose={() => setShowModal(false)} 
            onSave={async (productData) => {
              if (editingProduct) {
                await handleUpdateProduct(editingProduct.id, productData);
              } else {
                await handleCreateProduct(productData);
              }
            }} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการสินค้า/บริการ</h1>
          <p className="text-gray-600">เพิ่มและจัดการสินค้า/บริการทั้งหมด</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          เพิ่มสินค้าใหม่
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <HiSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'ทุกหมวดหมู่' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.main_image_url || product.imageUrl || '/src/assets/photobooth.jpg'}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.src = '/src/assets/photobooth.jpg';
                }}
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
              </div>
              <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                <HiCube className="w-4 h-4" />
                {product.category}
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">฿{product.price}</p>
                {product.price_details && (
                  <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{product.price_details}</p>
                )}
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">คุณสมบัติ:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {(product.features || []).map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                  {(!product.features || product.features.length === 0) && (
                    <li className="text-gray-400 italic">ไม่มีข้อมูลคุณสมบัติ</li>
                  )}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">ข้อมูลทางเทคนิค:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {(product.technicalSpecs || product.technical_specs || []).map((spec, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      {spec}
                    </li>
                  ))}
                  {(!product.technicalSpecs && !product.technical_specs || 
                    (product.technicalSpecs && product.technicalSpecs.length === 0) || 
                    (product.technical_specs && product.technical_specs.length === 0)) && (
                    <li className="text-gray-400 italic">ไม่มีข้อมูลทางเทคนิค</li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <HiPencil className="w-4 h-4" />
                  แก้ไข
                </button>
                <button
                  onClick={() => handleStatusToggle(product.id)}
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    product.status === 'active'
                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {product.status === 'active' ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  {product.status === 'active' ? 'ซ่อน' : 'แสดง'}
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload/Edit Modal */}
      {showModal && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setShowModal(false)} 
          onSave={async (productData) => {
            if (editingProduct) {
              await handleUpdateProduct(editingProduct.id, productData);
            } else {
              await handleCreateProduct(productData);
            }
          }}
          uploading={uploading}
        />
      )}

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={4000}
      />
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ product, onClose, onSave, uploading }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    priceDetails: product?.price_details || product?.priceDetails || '',
    priceDetailItems: (product?.price_details || product?.priceDetails)
      ? (product?.price_details || product?.priceDetails)
          .split('\n')
          .map((s) => s.replace(/^•\s*/, '').trim())
          .filter((s) => s.length > 0)
      : [''],
    price: product?.price || '',
    category: product?.category || 'PhotoBooth',
    status: product?.status || 'active',
    features: product?.features ? (Array.isArray(product.features) ? product.features : product.features.split(',').map(f => f.trim())) : [''],
    technicalSpecs: product?.technical_specs ? (Array.isArray(product.technical_specs) ? product.technical_specs : product.technical_specs.split(',').map(s => s.trim())) : [''],
    mainImage: null,
    detailImages: [],
    // เพิ่ม state สำหรับแสดงรูปภาพที่อัพโหลดไว้แล้ว
    currentMainImageUrl: product?.main_image_url || null,
    currentDetailImageUrls: product?.detail_images || [],
    // เพิ่ม state สำหรับติดตามการลบรูปภาพ
    shouldDeleteMainImage: false,
    shouldDeleteDetailImages: false
  });

  // อัพเดท formData เมื่อ product เปลี่ยน
  useEffect(() => {
    console.log('ProductModal - product changed:', product);
    console.log('Product features:', product?.features);
    console.log('Product technical_specs:', product?.technical_specs);
    console.log('Product main_image_url:', product?.main_image_url);
    console.log('Product detail_images:', product?.detail_images);
    
    const newFormData = {
      title: product?.title || '',
      description: product?.description || '',
      priceDetails: product?.price_details || product?.priceDetails || '',
      priceDetailItems: (product?.price_details || product?.priceDetails)
        ? (product?.price_details || product?.priceDetails)
            .split('\n')
            .map((s) => s.replace(/^•\s*/, '').trim())
            .filter((s) => s.length > 0)
        : [''],
      price: product?.price || '',
      category: product?.category || 'PhotoBooth',
      status: product?.status || 'active',
      features: product?.features ? (Array.isArray(product.features) ? product.features : product.features.split(',').map(f => f.trim())) : [''],
      technicalSpecs: product?.technical_specs ? (Array.isArray(product.technical_specs) ? product.technical_specs : product.technical_specs.split(',').map(s => s.trim())) : [''],
      mainImage: null, // ไฟล์ใหม่ที่เลือก
      detailImages: [], // ไฟล์ใหม่ที่เลือก
      // รูปภาพที่อัพโหลดไว้แล้ว
      currentMainImageUrl: product?.main_image_url || null,
      currentDetailImageUrls: product?.detail_images || [],
      // รีเซ็ตการลบรูปภาพ
      shouldDeleteMainImage: false,
      shouldDeleteDetailImages: false
    };
    
    console.log('New formData:', newFormData);
    setFormData(newFormData);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Filter out empty features
      const cleanFeatures = formData.features.filter(feature => feature.trim() !== '');
      // Filter out empty technical specs
      const cleanTechnicalSpecs = formData.technicalSpecs.filter(spec => spec.trim() !== '');
      // รวม price detail items เป็นข้อความบรรทัดละรายการ
      const cleanPriceDetailItems = (formData.priceDetailItems || []).map(s => s.trim()).filter(s => s);
      const priceDetailsText = cleanPriceDetailItems.length > 0
        ? `• ${cleanPriceDetailItems.join('\n• ')}`
        : (formData.priceDetails || '');

      // สร้าง object สำหรับส่งไป API พร้อมไฟล์รูปภาพ
      const submitData = {
        title: formData.title,
        description: formData.description,
        priceDetails: priceDetailsText,
        price: formData.price,
        category: formData.category,
        status: formData.status,
        features: cleanFeatures,
        technicalSpecs: cleanTechnicalSpecs,
        mainImageFile: formData.mainImage, // ไฟล์รูปภาพหลัก
        detailImageFiles: formData.detailImages, // ไฟล์รูปภาพรายละเอียด
        shouldDeleteMainImage: formData.shouldDeleteMainImage, // ต้องการลบรูปภาพหลัก
        shouldDeleteDetailImages: formData.shouldDeleteDetailImages // ต้องการลบรูปภาพรายละเอียด
      };
      
      console.log('Form submit data:', submitData);
      console.log('Main image file:', formData.mainImage);
      console.log('Detail image files:', formData.detailImages);
      console.log('Should delete main image:', formData.shouldDeleteMainImage);
      console.log('Should delete detail images:', formData.shouldDeleteDetailImages);
      console.log('🔍 Form submission - formData state:', formData);
      console.log('🔍 Form submission - submitData object:', submitData);
      console.log('🔍 Form submission - shouldDeleteMainImage type:', typeof formData.shouldDeleteMainImage);
      console.log('🔍 Form submission - shouldDeleteDetailImages type:', typeof formData.shouldDeleteDetailImages);
      
      await onSave(submitData);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      // ไม่ต้องแสดง alert ที่นี่ เพราะจะแสดงในฟังก์ชัน handleCreateProduct หรือ handleUpdateProduct
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleTechnicalSpecChange = (index, value) => {
    const newTechnicalSpecs = [...formData.technicalSpecs];
    newTechnicalSpecs[index] = value;
    setFormData({ ...formData, technicalSpecs: newTechnicalSpecs });
  };

  const addTechnicalSpec = () => {
    setFormData({ ...formData, technicalSpecs: [...formData.technicalSpecs, ''] });
  };

  const removeTechnicalSpec = (index) => {
    const newTechnicalSpecs = formData.technicalSpecs.filter((_, i) => i !== index);
    setFormData({ ...formData, technicalSpecs: newTechnicalSpecs });
  };

  const handlePriceDetailChange = (index, value) => {
    const items = [...formData.priceDetailItems];
    items[index] = value;
    setFormData({ ...formData, priceDetailItems: items });
  };

  const addPriceDetail = () => {
    setFormData({ ...formData, priceDetailItems: [...formData.priceDetailItems, ''] });
  };

  const removePriceDetail = (index) => {
    const items = formData.priceDetailItems.filter((_, i) => i !== index);
    setFormData({ ...formData, priceDetailItems: items.length > 0 ? items : [''] });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อสินค้า
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  หมวดหมู่
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="PhotoBooth, Video Booth, AI Services, Equipment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำอธิบาย
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="อธิบายสินค้า/บริการ..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รายละเอียดราคา
              </label>
              <div className="space-y-2">
                {(formData.priceDetailItems || []).map((line, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => handlePriceDetailChange(index, e.target.value)}
                      placeholder="เช่น ครึ่งวันงาน (4 ชั่วโมง) 15,000 บาท"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removePriceDetail(index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPriceDetail}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
                >
                  + เพิ่มรายละเอียดราคา
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคา (บาท)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="15,000"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คุณสมบัติ
              </label>
              <div className="space-y-2">
                {console.log('Rendering features:', formData.features)}
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="คุณสมบัติ..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
                >
                  + เพิ่มคุณสมบัติ
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ข้อมูลทางเทคนิค
              </label>
              <div className="space-y-2">
                {console.log('Rendering technicalSpecs:', formData.technicalSpecs)}
                {formData.technicalSpecs.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={spec}
                      onChange={(e) => handleTechnicalSpecChange(index, e.target.value)}
                      placeholder="ข้อมูลทางเทคนิค..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTechnicalSpec(index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTechnicalSpec}
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors"
                >
                  + เพิ่มข้อมูลทางเทคนิค
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รูปภาพหลัก
              </label>
              
              {/* แสดงรูปภาพปัจจุบัน (ถ้ามี) */}
              {formData.currentMainImageUrl && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">รูปภาพปัจจุบัน:</p>
                  <div className="relative inline-block">
                    <img
                      src={formData.currentMainImageUrl}
                      alt="รูปภาพหลักปัจจุบัน"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.target.src = '/src/assets/photobooth.jpg';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        console.log('🗑️ User clicked delete main image button');
                        setFormData(prev => ({ 
                          ...prev, 
                          currentMainImageUrl: null,
                          shouldDeleteMainImage: true 
                        }));
                        console.log('✅ shouldDeleteMainImage set to true');
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      title="ลบรูปภาพปัจจุบัน"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => document.getElementById('mainImageInput').click()}
              >
                <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  {formData.currentMainImageUrl ? 'คลิกเพื่อเปลี่ยนรูปภาพ' : 'คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง'}
                </p>
                <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
                <input
                  id="mainImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData({ ...formData, mainImage: file });
                    }
                  }}
                />
                {formData.mainImage && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600">✓ เลือกไฟล์ใหม่แล้ว: {formData.mainImage.name}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รูปรายละเอียดเพิ่มเติม
              </label>
              
              {/* แสดงรูปภาพปัจจุบัน (ถ้ามี) */}
              {formData.currentDetailImageUrls && formData.currentDetailImageUrls.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">รูปภาพปัจจุบัน:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {formData.currentDetailImageUrls.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img
                          src={imageUrl}
                          alt={`รูปภาพรายละเอียด ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-300"
                          onError={(e) => {
                            e.target.src = '/src/assets/photobooth.jpg';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newUrls = formData.currentDetailImageUrls.filter((_, i) => i !== index);
                            console.log('🗑️ User clicked delete detail image button, index:', index);
                            console.log('🗑️ Original detail images:', formData.currentDetailImageUrls);
                            console.log('🗑️ New detail images after deletion:', newUrls);
                            setFormData(prev => ({ 
                              ...prev, 
                              currentDetailImageUrls: newUrls,
                              // ถ้าลบรูปภาพรายละเอียดหมดแล้ว ให้เซ็ต flag การลบ
                              shouldDeleteDetailImages: newUrls.length === 0
                            }));
                            console.log('✅ shouldDeleteDetailImages set to:', newUrls.length === 0);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          title="ลบรูปภาพ"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => document.getElementById('detailImagesInput').click()}
              >
                <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  {formData.currentDetailImageUrls && formData.currentDetailImageUrls.length > 0 
                    ? 'คลิกเพื่อเพิ่มรูปภาพเพิ่มเติม' 
                    : 'คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง'
                  }
                </p>
                <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB (เลือกได้หลายไฟล์)</p>
                <input
                  id="detailImagesInput"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFormData({ ...formData, detailImages: [...formData.detailImages, ...files] });
                  }}
                />
                {formData.detailImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600 mb-2">✓ เลือกไฟล์ใหม่แล้ว {formData.detailImages.length} ไฟล์:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.detailImages.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-xs text-gray-600 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = formData.detailImages.filter((_, i) => i !== index);
                              setFormData({ ...formData, detailImages: newImages });
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <HiTrash className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                สถานะ
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">เปิดใช้งาน</option>
                <option value="inactive">ปิดใช้งาน</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={uploading}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  uploading 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    กำลังอัพโหลด...
                  </>
                ) : (
                  <>
                    <HiSave className="w-4 h-4" />
                    {product ? 'บันทึก' : 'เพิ่มสินค้า'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts; 