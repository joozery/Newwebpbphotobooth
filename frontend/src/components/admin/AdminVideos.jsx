import React, { useState } from 'react';
import { 
  HiPlus, 
  HiTrash, 
  HiPencil, 
  HiEye, 
  HiEyeOff,
  HiUpload,
  HiPlay,
  HiClock
} from 'react-icons/hi';

const AdminVideos = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'UOB 2023 Service Convention',
      subtitle: 'The Wonder of C&DLympic',
      brand: 'UOB',
      duration: '2:27',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/videos/uob-2023.mp4',
      status: 'active'
    },
    {
      id: 2,
      title: 'CHARLES & KEITH',
      subtitle: 'Fashion Show',
      brand: 'CHARLES & KEITH',
      duration: '0:37',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/videos/charles-keith.mp4',
      status: 'active'
    },
    {
      id: 3,
      title: 'Supergoop! THE SPF! PARTY',
      subtitle: 'Brand Event',
      brand: 'Supergoop!',
      duration: '1:02',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/videos/supergoop-party.mp4',
      status: 'active'
    },
    {
      id: 4,
      title: 'Calypso Weekend 2023',
      subtitle: 'Music Festival',
      brand: 'Calypso',
      duration: '0:30',
      thumbnail: '/api/placeholder/300/200',
      videoUrl: '/api/videos/calypso-weekend.mp4',
      status: 'inactive'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const filteredVideos = videos.filter(video => {
    return true; // Show all videos since we removed search and category filtering
  });

  const handleEdit = (video) => {
    setEditingVideo(video);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบวิดีโอนี้?')) {
      setVideos(videos.filter(v => v.id !== id));
    }
  };

  const handleStatusToggle = (id) => {
    setVideos(videos.map(v => 
      v.id === id ? { ...v, status: v.status === 'active' ? 'inactive' : 'active' } : v
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการวิดีโอ Portfolio</h1>
          <p className="text-gray-600">อัพโหลดและจัดการวิดีโอผลงานทั้งหมด</p>
        </div>
        <button
          onClick={() => {
            setEditingVideo(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          อัพโหลดไฟล์วิดีโอ
        </button>
      </div>



      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  video.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {video.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                <HiClock className="w-4 h-4" />
                {video.duration}
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.subtitle}</p>
                <p className="text-sm font-medium text-blue-600">{video.brand}</p>
              </div>
              


              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(video)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <HiPencil className="w-4 h-4" />
                  แก้ไข
                </button>
                <button
                  onClick={() => handleStatusToggle(video.id)}
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    video.status === 'active'
                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {video.status === 'active' ? (
                    <HiEyeOff className="w-4 h-4" />
                  ) : (
                    <HiEye className="w-4 h-4" />
                  )}
                  {video.status === 'active' ? 'ซ่อน' : 'แสดง'}
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">ไม่พบวิดีโอที่ตรงกับการค้นหา</p>
        </div>
      )}

      {/* Video Modal */}
      {showModal && (
        <VideoModal
          video={editingVideo}
          onClose={() => setShowModal(false)}
          onSave={(videoData) => {
            if (editingVideo) {
              setVideos(videos.map(v => 
                v.id === editingVideo.id ? { ...v, ...videoData } : v
              ));
            } else {
              const newVideo = {
                ...videoData,
                id: Math.max(...videos.map(v => v.id)) + 1,
                status: 'active'
              };
              setVideos([...videos, newVideo]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

// Video Modal Component
const VideoModal = ({ video, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    subtitle: video?.subtitle || '',
    brand: video?.brand || '',
    duration: video?.duration || '',
    status: video?.status || 'active',
    thumbnail: video?.thumbnail || ''
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
              {video ? 'แก้ไขวิดีโอ' : 'อัพโหลดวิดีโอใหม่'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อวิดีโอ
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
                  ชื่อรอง
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  แบรนด์
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระยะเวลา (นาที:วินาที)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="2:27"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>



            {!video && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เลือกไฟล์วิดีโอ
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง</p>
                    <p className="text-xs text-gray-500">รองรับไฟล์ MP4, MOV, AVI ขนาดไม่เกิน 100MB</p>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        // Handle file upload logic here
                        console.log('Video file selected:', e.target.files[0]);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เลือกไฟล์รูปภาพ Thumbnail
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
                        console.log('Thumbnail file selected:', e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {video && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL รูปภาพ Thumbnail
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                {video ? 'บันทึกการแก้ไข' : 'อัพโหลดวิดีโอ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminVideos; 