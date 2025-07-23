import React, { useState, useEffect } from 'react';
import { 
  HiPlus, 
  HiTrash, 
  HiPencil, 
  HiEye, 
  HiEyeOff,
  HiUpload,
  HiPhotograph,
  HiSearch,
  HiRefresh,
  HiX
} from 'react-icons/hi';
import { 
  fetchGalleryImages, 
  uploadGalleryImage, 
  uploadMultipleGalleryImages,
  updateImageStatus, 
  deleteGalleryImage 
} from '../../services/galleryService';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch all gallery images
  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await fetchGalleryImages();
      setImages(data);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Upload multiple images
  const handleUpload = async (imageData) => {
    if (selectedFiles.length === 0) {
      showNotification('กรุณาเลือกไฟล์', 'error');
      return;
    }

    try {
      setUploading(true);
      await uploadMultipleGalleryImages(selectedFiles, imageData.status);
      showNotification(`อัพโหลดรูปภาพ ${selectedFiles.length} ภาพสำเร็จ!`, 'success');
      setSelectedFiles([]);
      loadImages(); // Refresh the list
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // Update image status
  const handleStatusToggle = async (id) => {
    const currentImage = images.find(img => img.id === id);
    const newStatus = currentImage.status === 'active' ? 'inactive' : 'active';

    try {
      await updateImageStatus(id, newStatus);
      showNotification('อัพเดทสถานะสำเร็จ!', 'success');
      loadImages(); // Refresh the list
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบภาพนี้?')) return;

    try {
      await deleteGalleryImage(id);
      showNotification('ลบรูปภาพสำเร็จ!', 'success');
      loadImages(); // Refresh the list
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Handle file selection (multiple files)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      showNotification('บางไฟล์ไม่ใช่รูปภาพ กรุณาเลือกไฟล์รูปภาพเท่านั้น', 'error');
    }
    
    if (imageFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...imageFiles]);
      showNotification(`เลือกไฟล์แล้ว ${imageFiles.length} ไฟล์`, 'info');
    }
  };

  // Remove file from selection
  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...imageFiles]);
      showNotification(`เพิ่มไฟล์แล้ว ${imageFiles.length} ไฟล์`, 'info');
    } else {
      showNotification('กรุณาเลือกไฟล์รูปภาพเท่านั้น', 'error');
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <HiRefresh className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

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
            setSelectedFiles([]);
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
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={image.image_url}
                alt={`Gallery image ${image.id}`}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                }}
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
              <p className="text-xs text-gray-500 mb-4">
                อัพโหลดเมื่อ: {new Date(image.upload_date).toLocaleDateString('th-TH')}
              </p>

              <div className="flex gap-2">
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

      {/* Upload Modal */}
      {showModal && (
        <ImageModal 
          image={editingImage} 
          onClose={() => setShowModal(false)} 
          onSave={handleUpload}
          onFileSelect={handleFileSelect}
          selectedFiles={selectedFiles}
          uploading={uploading}
          removeFile={removeFile}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

// Image Modal Component
const ImageModal = ({ image, onClose, onSave, onFileSelect, selectedFiles, uploading, removeFile, handleDragOver, handleDrop }) => {
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
            อัพโหลดภาพใหม่
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เลือกไฟล์ภาพ (หลายไฟล์ได้)
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง</p>
              <p className="text-xs text-gray-500">รองรับไฟล์รูปภาพหลายไฟล์</p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onFileSelect}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm text-blue-600 hover:text-blue-500">
                  เลือกไฟล์
                </span>
              </label>
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">ไฟล์ที่เลือก ({selectedFiles.length} ไฟล์):</p>
                <div className="max-h-32 overflow-y-auto">
                  <ul className="list-none p-0 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md text-sm text-gray-800">
                        <span className="truncate flex-1">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  ขนาดรวม: {(selectedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            )}
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
              disabled={selectedFiles.length === 0 || uploading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <HiRefresh className="animate-spin w-4 h-4" />
                  อัพโหลด...
                </>
              ) : (
                'อัพโหลด'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGallery; 