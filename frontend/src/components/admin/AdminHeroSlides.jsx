import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PresentationChartLineIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { heroSlideService } from '../../services/heroSlideService';

const AdminHeroSlides = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await heroSlideService.getAllSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast.error('ไม่สามารถโหลดข้อมูล Hero Slides ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('กรุณาเลือกไฟล์รูปภาพ');
      return;
    }

    try {
      setUploading(true);
      
      if (editingSlide) {
        await heroSlideService.updateSlide(editingSlide.id, selectedFile);
        toast.success('อัพเดท Hero Slide สำเร็จ');
      } else {
        await heroSlideService.createSlide(selectedFile);
        toast.success('สร้าง Hero Slide สำเร็จ');
      }
      
      setShowModal(false);
      setEditingSlide(null);
      resetForm();
      fetchSlides();
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setPreviewUrl(slide.image_url || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบ Hero Slide นี้?')) {
      return;
    }

    try {
      await heroSlideService.deleteSlide(id);
      toast.success('ลบ Hero Slide สำเร็จ');
      fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast.error('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await heroSlideService.updateSlide(id, { status: newStatus });
      toast.success('อัพเดทสถานะสำเร็จ');
      fetchSlides();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
    }
  };

  const handleReorder = async (id, direction) => {
    const currentSlide = slides.find(slide => slide.id === id);
    const currentIndex = slides.findIndex(slide => slide.id === id);
    
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === slides.length - 1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const targetSlide = slides[targetIndex];

    try {
      await Promise.all([
        heroSlideService.updateSlide(id, { slide_order: targetSlide.slide_order }),
        heroSlideService.updateSlide(targetSlide.id, { slide_order: currentSlide.slide_order })
      ]);
      
      toast.success('อัพเดทลำดับสำเร็จ');
      fetchSlides();
    } catch (error) {
      console.error('Error reordering:', error);
      toast.error('เกิดข้อผิดพลาดในการอัพเดทลำดับ');
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const openCreateModal = () => {
    setEditingSlide(null);
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlide(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการ Hero Slides</h1>
          <p className="text-gray-600">อัพโหลดรูปภาพสำหรับ Hero Section ของเว็บไซต์</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          อัพโหลดรูปภาพ
        </button>
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              {slide.image_url ? (
                <img
                  src={slide.image_url}
                  alt={slide.alt_text || slide.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <PhotoIcon className="w-12 h-12" />
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  slide.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {slide.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{slide.title || 'ไม่มีชื่อ'}</h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>ลำดับ: {slide.slide_order}</span>
                <span>สร้างเมื่อ: {new Date(slide.created_at).toLocaleDateString('th-TH')}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="แก้ไข"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(slide.id, slide.status)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title={slide.status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                  >
                    {slide.status === 'active' ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="ลบ"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Reorder Buttons */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleReorder(slide.id, 'up')}
                    disabled={slides.indexOf(slide) === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="เลื่อนขึ้น"
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReorder(slide.id, 'down')}
                    disabled={slides.indexOf(slide) === slides.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="เลื่อนลง"
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {slides.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PresentationChartLineIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มี Hero Slides</h3>
          <p className="text-gray-600 mb-4">เริ่มต้นด้วยการอัพโหลดรูปภาพแรกของคุณ</p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            อัพโหลดรูปภาพ
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingSlide ? 'แก้ไข Hero Slide' : 'อัพโหลดรูปภาพใหม่'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เลือกรูปภาพ
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="space-y-2">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-gray-600">คลิกเพื่อเปลี่ยนรูปภาพ</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-600">คลิกเพื่อเลือกรูปภาพ</p>
                        <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG, GIF</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={uploading}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || uploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {uploading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  )}
                  {editingSlide ? 'อัพเดท' : 'อัพโหลด'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeroSlides; 