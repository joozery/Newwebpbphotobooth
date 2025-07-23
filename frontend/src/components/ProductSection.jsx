import React, { useState, useEffect } from 'react';
import { FaTimes, FaPhone, FaLine, FaInfoCircle, FaCalendarAlt, FaComments } from 'react-icons/fa';
import { fetchProducts } from '../services/productService';

// รูป Photobooth Box B1-B4
import B1Img from '../assets/slidehero/B1.png';
import B2Img from '../assets/slidehero/B2.png';
import B3Img from '../assets/slidehero/B3.png';
import B4Img from '../assets/slidehero/B4.png';

// รูปสินค้าเพิ่มเติม
import aumongImg from '../assets/slidehero/aumong.png';
import miniaiImg from '../assets/slidehero/miniai.png';

// Default images สำหรับ fallback
const defaultImages = {
  'PhotoBooth': '/src/assets/slidehero/pb.png',
  'PB Memory': '/src/assets/slidehero/PBMemory.png',
  '360 Video Booth': '/src/assets/slidehero/pb2.png',
  'Photobooth Box B1': B1Img,
  'Photobooth Box B2': B2Img,
  'Photobooth Box B3': B3Img,
  'Photobooth Box B4': B4Img,
  'AI Photobooth': '/src/assets/slidehero/Ai2.png',
  'Mini AI Photobooth': miniaiImg,
  'Au Mong': aumongImg,
  'AI mini studio': miniaiImg,
  'อุโมงค์': aumongImg
};

function ProductCard({ img, title, desc, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-2xl transition flex flex-col border">
      <img src={img} alt={title} className="w-full h-40 object-contain bg-white rounded-t-xl" />
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="font-semibold text-lg mb-1 text-black">{title}</div>
        <div className="text-black text-sm text-center mb-4">{desc}</div>
        <button 
          onClick={() => onViewDetails(title)}
          className="mt-auto text-blue-500 underline bg-blue-50 rounded px-4 py-1 font-medium transition hover:bg-blue-100"
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
}

// Detail Modal Component
function ProductDetailModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto scrollbar-hide">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">{product.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Single Image */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <img 
              src={product.main_image_url || defaultImages[product.title]} 
              alt={product.title}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Component
function ProductModal({ isOpen, onClose, product, onMoreDetails }) {
  if (!isOpen || !product) return null;

  // แปลงข้อมูลจาก API ให้ตรงกับ UI
  const formatPriceDetails = (priceDetails) => {
    if (!priceDetails) return ['ราคาติดต่อสอบถาม'];
    if (typeof priceDetails === 'string') {
      return priceDetails.split(',').map(item => item.trim());
    }
    return [priceDetails];
  };

  const formatFeatures = (features) => {
    if (!features || features.length === 0) return ['คุณสมบัติพิเศษ'];
    if (Array.isArray(features)) {
      return features;
    }
    if (typeof features === 'string') {
      return features.split(',').map(item => item.trim());
    }
    return ['คุณสมบัติพิเศษ'];
  };

  const formatSpecifications = (technicalSpecs) => {
    if (!technicalSpecs || technicalSpecs.length === 0) return ['ข้อมูลทางเทคนิค'];
    if (Array.isArray(technicalSpecs)) {
      return technicalSpecs;
    }
    if (typeof technicalSpecs === 'string') {
      return technicalSpecs.split(',').map(item => item.trim());
    }
    return ['ข้อมูลทางเทคนิค'];
  };

  const priceDetails = formatPriceDetails(product.price_details);
  const features = formatFeatures(product.features);
  const specifications = formatSpecifications(product.technical_specs);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">{product.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <img 
                  src={product.main_image_url || defaultImages[product.title]} 
                  alt={product.title}
                  className="w-full h-80 object-contain rounded-lg"
                />
              </div>
              
              {/* Detail Images */}
              {product.detail_images && product.detail_images.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {product.detail_images.slice(0, 4).map((image, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <img 
                        src={image} 
                        alt={`${product.title} detail ${index + 1}`}
                        className="w-full h-32 object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">ราคา</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">
                  {product.price || 'ราคาติดต่อสอบถาม'}
                </p>
                <div className="space-y-2">
                  {priceDetails.map((detail, index) => (
                    <p key={index} className="text-gray-700">• {detail}</p>
                  ))}
                </div>
              </div>

              {/* Contact & Action Buttons */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-black mb-6">ติดต่อสอบถาม</h3>
                <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaLine className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium">Line: @pbphotobooth</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium">096-962-6465 บีม</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium">082-491-5575 พี</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => window.open('https://line.me/R/ti/p/@pbphotobooth', '_blank')}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-3 text-lg"
                  >
                    <FaComments />
                    สอบถามราคา
                  </button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <button 
                      onClick={() => window.open('tel:0969626465', '_self')}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-3 text-lg"
                    >
                      <FaPhone />
                      <span>โทร บีม</span>
                    </button>
                    <button 
                      onClick={() => window.open('tel:0824915575', '_self')}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-3 text-lg"
                    >
                      <FaPhone />
                      <span>โทร พี</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={onMoreDetails}
                    className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-3 text-lg"
                  >
                    <FaInfoCircle />
                    รายละเอียดเพิ่มเติม
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 bg-white rounded-xl border p-6">
            <h3 className="text-2xl font-bold text-black mb-6">คุณสมบัติเด่น</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-black mb-6">ข้อมูลทางเทคนิค</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-start p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                    <span className="text-white text-sm font-bold">•</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // ดึงข้อมูลสินค้าจาก API
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        console.log('Fetched products:', data);
        
        // เรียงข้อมูลตาม id จากน้อยไปมาก (แรกถึงสุดท้าย)
        const sortedProducts = data.sort((a, b) => a.id - b.id);
        console.log('Sorted products:', sortedProducts);
        
        setProducts(sortedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('ไม่สามารถดึงข้อมูลสินค้าได้');
        // ใช้ข้อมูล fallback ถ้า API ไม่ทำงาน
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const handleViewDetails = (productTitle) => {
    console.log('Clicked product:', productTitle);
    const product = products.find(p => p.title === productTitle);
    console.log('Product data:', product);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
      console.log('Modal should open now');
    } else {
      console.log('Product not found!');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleMoreDetails = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // แสดง loading
  if (loading) {
    return (
      <section id="portfolio" className="w-full py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดข้อมูลสินค้า...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // แสดง error
  if (error) {
    return (
      <section id="portfolio" className="w-full py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="portfolio" className="w-full py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">รวมสินค้าและบริการ</h2>
              <p className="text-black text-sm mt-1">ค้นหาสินค้าและบริการถ่ายภาพงานแต่งที่เหมาะกับคุณ</p>
            </div>
            <button className="border border-gray-300 rounded px-4 py-1 text-black hover:bg-gray-100 transition">ดูทั้งหมด</button>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">ไม่มีข้อมูลสินค้า</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  img={product.main_image_url || defaultImages[product.title]} 
                  title={product.title} 
                  desc={product.description} 
                  onViewDetails={handleViewDetails} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={selectedProduct} 
        onMoreDetails={handleMoreDetails}
      />

      {/* Detail Modal */}
      <ProductDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={closeDetailModal} 
        product={selectedProduct} 
      />
    </>
  );
};

export default ProductSection; 