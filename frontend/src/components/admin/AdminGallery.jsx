import React, { useState } from 'react';
import { 
  HiPlus, 
  HiTrash, 
  HiPencil, 
  HiEye, 
  HiEyeOff,
  HiUpload,
  HiPhotograph,
  HiSearch
} from 'react-icons/hi';

const AdminGallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      imageUrl: '/src/assets/gallery/1.jpg',
      status: 'active',
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      imageUrl: '/src/assets/gallery/2.jpg',
      status: 'active',
      uploadDate: '2024-01-10'
    },
    {
      id: 3,
      imageUrl: '/src/assets/gallery/3.jpg',
      status: 'active',
      uploadDate: '2024-01-08'
    },
    {
      id: 4,
      imageUrl: '/src/assets/gallery/4.jpg',
      status: 'inactive',
      uploadDate: '2024-01-05'
    },
    {
      id: 5,
      imageUrl: '/src/assets/gallery/5.jpg',
      status: 'active',
      uploadDate: '2024-01-03'
    },
    {
      id: 6,
      imageUrl: '/src/assets/gallery/6.jpg',
      status: 'active',
      uploadDate: '2024-01-01'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);


  const filteredImages = images.filter(image => {
    return true; // Show all images since we removed search and category filtering
  });

  const handleEdit = (image) => {
    setEditingImage(image);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบภาพนี้?')) {
      setImages(images.filter(img => img.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, status: img.status === 'active' ? 'inactive' : 'active' } : img
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการแกลลอรี่</h1>
          <p className="text-gray-600">อัพโหลดและจัดการภาพผลงานทั้งหมด</p>
        </div>
        <button
          onClick={() => {
            setEditingImage(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          อัพโหลดภาพใหม่
        </button>
      </div>



      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  image.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {image.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
              </div>

            </div>
            
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-4">อัพโหลดเมื่อ: {image.uploadDate}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <HiPencil className="w-4 h-4" />
                  แก้ไข
                </button>
                <button
                  onClick={() => handleStatusToggle(image.id)}
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    image.status === 'active'
                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {image.status === 'active' ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  {image.status === 'active' ? 'ซ่อน' : 'แสดง'}
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
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
        <ImageModal 
          image={editingImage} 
          onClose={() => setShowModal(false)} 
          onSave={(imageData) => {
            if (editingImage) {
              setImages(images.map(img => 
                img.id === editingImage.id ? { ...img, ...imageData } : img
              ));
            } else {
              setImages([...images, { 
                id: Date.now(), 
                ...imageData, 
                uploadDate: new Date().toISOString().split('T')[0] 
              }]);
            }
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
};

// Image Modal Component
const ImageModal = ({ image, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    status: image?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {image ? 'แก้ไขภาพ' : 'อัพโหลดภาพใหม่'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {!image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลือกไฟล์ภาพ
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    // Handle file upload logic here
                    console.log('File selected:', e.target.files[0]);
                  }}
                />
              </div>
            </div>
          )}

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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {image ? 'บันทึก' : 'อัพโหลด'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGallery; 