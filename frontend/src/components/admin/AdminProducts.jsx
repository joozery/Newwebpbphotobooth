import React, { useState } from 'react';
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

const AdminProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'PhotoBooth Classic',
      description: 'บริการ PhotoBooth แบบคลาสสิก พร้อมอุปกรณ์ครบครัน',
      features: ['ถ่ายภาพคุณภาพสูง', 'พิมพ์ภาพทันที', 'อุปกรณ์ครบครัน'],
      price: '15,000',
      imageUrl: '/src/assets/photobooth.jpg',
      status: 'active',
      category: 'PhotoBooth',
      technicalSpecs: [
        'กล้อง: Canon EOS R6 Mark II',
        'เลนส์: RF 24-70mm f/2.8L IS USM',
        'พรินเตอร์: Canon SELPHY CP1500',
        'กระดาษ: 5x7 inch Premium Glossy',
        'ความละเอียด: 4K (3840x2160)',
        'เวลาติดตั้ง: 30-45 นาที',
        'พลังงาน: 220V AC',
        'ขนาด: 2.5m x 2.5m x 2.8m',
        'น้ำหนัก: 150 kg'
      ]
    },
    {
      id: 2,
      title: '360 Video Booth',
      description: 'บริการถ่ายวิดีโอ 360 องศา พร้อมเอฟเฟกต์พิเศษ',
      features: ['วิดีโอ 360 องศา', 'เอฟเฟกต์พิเศษ', 'แก้ไขออนไลน์'],
      price: '25,000',
      imageUrl: '/src/assets/360video.jpg',
      status: 'active',
      category: 'Video Booth',
      technicalSpecs: [
        'กล้อง: GoPro MAX 360',
        'ความละเอียด: 5.6K 360° Video',
        'อัตราเฟรม: 30fps',
        'การรักษาเสถียรภาพ: HyperSmooth 2.0',
        'ที่เก็บข้อมูล: 256GB MicroSD',
        'แบตเตอรี่: Removable 1600mAh',
        'การเชื่อมต่อ: WiFi + Bluetooth',
        'ขนาด: 3m x 3m x 3.2m',
        'น้ำหนัก: 200 kg',
        'แสงสว่าง: LED Ring Light 360°'
      ]
    },
    {
      id: 3,
      title: 'AI PhotoBooth',
      description: 'บริการ PhotoBooth ที่ใช้ AI ในการแก้ไขและปรับแต่งภาพ',
      features: ['AI แก้ไขภาพ', 'ฟิลเตอร์อัตโนมัติ', 'แชร์โซเชียล'],
      price: '20,000',
      imageUrl: '/src/assets/Aiphoto.jpg',
      status: 'inactive',
      category: 'AI Services',
      technicalSpecs: [
        'กล้อง: Sony A7 IV',
        'เลนส์: FE 24-70mm f/2.8 GM',
        'โปรเซสเซอร์: NVIDIA RTX 4080',
        'ซอฟต์แวร์ AI: Adobe Photoshop AI',
        'ความละเอียด: 33MP RAW',
        'ที่เก็บข้อมูล: 1TB NVMe SSD',
        'การเชื่อมต่อ: 5G WiFi + Ethernet',
        'ขนาด: 2.8m x 2.8m x 3m',
        'น้ำหนัก: 180 kg',
        'จอแสดงผล: 27" 4K Touchscreen'
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'PhotoBooth', 'Video Booth', 'AI Services', 'Equipment'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

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
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
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
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">คุณสมบัติ:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">ข้อมูลทางเทคนิค:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {product.technicalSpecs && product.technicalSpecs.map((spec, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      {spec}
                    </li>
                  ))}
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
          onSave={(productData) => {
            if (editingProduct) {
              setProducts(products.map(p => 
                p.id === editingProduct.id ? { ...p, ...productData } : p
              ));
            } else {
              setProducts([...products, { 
                id: Date.now(), 
                ...productData
              }]);
            }
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || 'PhotoBooth',
    status: product?.status || 'active',
    features: product?.features || [''],
    technicalSpecs: product?.technicalSpecs || ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty features
    const cleanFeatures = formData.features.filter(feature => feature.trim() !== '');
    // Filter out empty technical specs
    const cleanTechnicalSpecs = formData.technicalSpecs.filter(spec => spec.trim() !== '');
    onSave({ ...formData, features: cleanFeatures, technicalSpecs: cleanTechnicalSpecs });
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
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

            {!product && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เลือกไฟล์รูปภาพ
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง</p>
                  <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      // Handle file upload logic here
                      console.log('Image file selected:', e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            )}

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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <HiSave className="w-4 h-4" />
                {product ? 'บันทึก' : 'เพิ่มสินค้า'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts; 