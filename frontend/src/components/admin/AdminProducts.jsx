import React, { useState } from 'react';
import { 
  HiPlus, 
  HiSearch, 
  HiPencil, 
  HiEye, 
  HiEyeOff, 
  HiTrash 
} from 'react-icons/hi';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'PhotoBooth',
      category: 'Photo Services',
      price: '15,000',
      status: 'active',
      image: '/api/placeholder/150/150',
      description: 'งานแต่งงาน งานสมัชชา และงานกิจกรรมต่างๆ',
      bookings: 12
    },
    {
      id: 2,
      name: 'PB Memory',
      category: 'AI Services',
      price: '8,000',
      status: 'active',
      image: '/api/placeholder/150/150',
      description: 'ตู้ปิดคำภาพเพื่อของขวัญ แถม AI ด้วย',
      bookings: 4
    },
    {
      id: 3,
      name: '360 Video Booth',
      category: 'Video Services',
      price: '25,000',
      status: 'active',
      image: '/api/placeholder/150/150',
      description: 'เวทีหมุน 360 องศา ถ่ายรูปและวิดีโอ เจ๋งมาก',
      bookings: 8
    },
    {
      id: 4,
      name: 'AI Photobooth',
      category: 'AI Services',
      price: '20,000',
      status: 'inactive',
      image: '/api/placeholder/150/150',
      description: 'ระบบ AI จากระดับมืออาชีพ ล้ำสมัยระดับโลก',
      bookings: 6
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'Photo Services', 'Video Services', 'AI Services'];

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
          <p className="text-gray-600">จัดการข้อมูลสินค้าและบริการทั้งหมด</p>
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
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
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
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-lg font-bold text-blue-600">{product.price}฿</p>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>การจอง: {product.bookings} ครั้ง</span>
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
                  {product.status === 'active' ? (
                    <HiEye className="w-4 h-4" />
                  ) : (
                    <HiEyeOff className="w-4 h-4" />
                  )}
                  {product.status === 'active' ? 'ซ่อน' : 'แสดง'}
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
        </div>
      )}

      {/* Product Modal */}
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
              const newProduct = {
                ...productData,
                id: Math.max(...products.map(p => p.id)) + 1,
                bookings: 0
              };
              setProducts([...products, newProduct]);
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
    name: product?.name || '',
    category: product?.category || 'Photo Services',
    price: product?.price || '',
    description: product?.description || '',
    status: product?.status || 'active',
    image: product?.image || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อสินค้า
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมวดหมู่
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Photo Services">Photo Services</option>
                <option value="Video Services">Video Services</option>
                <option value="AI Services">AI Services</option>
              </select>
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
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำอธิบาย
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
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

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {product ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts; 