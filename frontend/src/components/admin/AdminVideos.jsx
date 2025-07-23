import React, { useState, useEffect } from 'react';
import { 
  HiPlus, 
  HiTrash, 
  HiPencil, 
  HiEye, 
  HiEyeOff,
  HiUpload,
  HiVideoCamera,
  HiRefresh
} from 'react-icons/hi';
import { videoAPI } from '../../services/videoService';
import Notification from '../ui/Notification';

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'success',
    message: ''
  });

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

  // Fetch all videos
  const loadVideos = async () => {
    try {
      setLoading(true);
      console.log('🔄 AdminVideos: เริ่มดึงข้อมูลวิดีโอ...');
      const response = await videoAPI.getAllVideos();
      console.log('✅ AdminVideos: ได้ข้อมูลวิดีโอแล้ว:', response.data);
      setVideos(response.data);
      setError(null);
    } catch (err) {
      console.error('❌ AdminVideos: Error fetching videos:', err);
      
      // ถ้า API ไม่ทำงาน ให้ใช้ข้อมูลตัวอย่าง
      if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
        console.log('⚠️ AdminVideos: ใช้ข้อมูลตัวอย่างเนื่องจาก API ไม่ทำงาน');
        
        // ข้อมูลตัวอย่าง
        const sampleVideos = [
          {
            id: 1,
            title: 'Charles & Keith Event',
            subtitle: 'งานเปิดตัวคอลเลกชันใหม่',
            brand: 'Charles & Keith',
            duration: '2:30',
            status: 'active',
            video_url: '/src/assets/video/charles&keith.mp4',
            thumbnail_url: '/src/assets/video/charleskeith.jpg',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-15T10:00:00Z'
          },
          {
            id: 2,
            title: 'Running Event',
            subtitle: 'งานวิ่งเพื่อการกุศล',
            brand: 'Running Club',
            duration: '1:45',
            status: 'active',
            video_url: '/src/assets/video/runing.mp4',
            thumbnail_url: '/src/assets/video/runing.jpg',
            created_at: '2024-01-16T10:00:00Z',
            updated_at: '2024-01-16T10:00:00Z'
          },
          {
            id: 3,
            title: 'SPF Party',
            subtitle: 'งานปาร์ตี้สุดพิเศษ',
            brand: 'SPF Events',
            duration: '3:15',
            status: 'active',
            video_url: '/src/assets/video/thespfparty.mp4',
            thumbnail_url: '/src/assets/video/thespfparty.jpg',
            created_at: '2024-01-17T10:00:00Z',
            updated_at: '2024-01-17T10:00:00Z'
          }
        ];
        
        setVideos(sampleVideos);
        setError(null);
        showNotification('warning', 'ใช้ข้อมูลตัวอย่างเนื่องจากไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        setError('ไม่สามารถดึงข้อมูลวิดีโอได้: ' + err.message);
        showNotification('error', 'ไม่สามารถดึงข้อมูลวิดีโอได้: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Upload new video
  const handleUpload = async (videoData) => {
    if (!selectedVideoFile) {
      showNotification('error', 'กรุณาเลือกไฟล์วิดีโอ');
      return;
    }

    if (!selectedThumbnailFile) {
      showNotification('error', 'กรุณาเลือกไฟล์ thumbnail (บังคับ)');
      return;
    }

    try {
      setUploading(true);
      console.log('🔄 AdminVideos: เริ่มอัพโหลดวิดีโอ...');
      await videoAPI.uploadVideo(selectedVideoFile, selectedThumbnailFile, videoData);
      console.log('✅ AdminVideos: อัพโหลดวิดีโอสำเร็จ');
      showNotification('success', 'อัพโหลดวิดีโอสำเร็จ!');
      setSelectedVideoFile(null);
      setSelectedThumbnailFile(null);
      loadVideos(); // Refresh the list
    } catch (err) {
      console.error('❌ AdminVideos: Error uploading video:', err);
      
      // ถ้า API ไม่ทำงาน ให้สร้างข้อมูลใน local state
      if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
        const newVideo = {
          id: videos.length + 1,
          title: videoData.title,
          subtitle: videoData.subtitle,
          brand: videoData.brand,
          duration: videoData.duration,
          status: videoData.status,
          video_url: '/src/assets/video/charles&keith.mp4', // ใช้วิดีโอตัวอย่าง
          thumbnail_url: selectedThumbnailFile ? URL.createObjectURL(selectedThumbnailFile) : '/src/assets/video/charleskeith.jpg',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setVideos([...videos, newVideo]);
        setSelectedVideoFile(null);
        setSelectedThumbnailFile(null);
        showNotification('success', 'อัพโหลดวิดีโอสำเร็จ! (ทำงานแบบ Offline)');
      } else {
        showNotification('error', 'เกิดข้อผิดพลาดในการอัพโหลดวิดีโอ: ' + (err.response?.data?.error || err.message));
      }
    } finally {
      setUploading(false);
    }
  };

  // Update video status
  const handleStatusToggle = async (id) => {
    const currentVideo = videos.find(video => video.id === id);
    const newStatus = currentVideo.status === 'active' ? 'inactive' : 'active';

    try {
      // อัพเดทใน local state ก่อน
      setVideos(videos.map(v => 
        v.id === id ? { ...v, status: newStatus } : v
      ));
      
      // แสดง notification
      showNotification('success', `เปลี่ยนสถานะวิดีโอเป็น: ${newStatus === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`);
      
      // ถ้ามี backend ให้อัพเดทใน API ด้วย
      try {
        await videoAPI.updateVideo(id, { status: newStatus });
      } catch (err) {
        console.log('API update failed, using local state only');
        showNotification('warning', 'อัพเดทสถานะในเซิร์ฟเวอร์ไม่สำเร็จ (ใช้ข้อมูลในเครื่อง)');
      }
    } catch (err) {
      console.error('Error toggling status:', err);
      showNotification('error', 'เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
    }
  };

  // Delete video
  const handleDelete = async (id) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบวิดีโอนี้?')) return;

    try {
      await videoAPI.deleteVideo(id);
      console.log('Video deleted successfully');
      loadVideos(); // Refresh the list
      showNotification('success', 'ลบวิดีโอสำเร็จ!');
    } catch (err) {
      console.error('Error deleting video:', err);
      
      // ถ้า API ไม่ทำงาน ให้ลบใน local state
      if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK' || !err.response) {
        setVideos(videos.filter(v => v.id !== id));
        showNotification('success', 'ลบวิดีโอสำเร็จ! (ทำงานแบบ Offline)');
      } else {
        showNotification('error', 'เกิดข้อผิดพลาดในการลบวิดีโอ');
      }
    }
  };

  // Handle file selection
  const handleVideoFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedVideoFile(file);
        showNotification('info', 'เลือกไฟล์วิดีโอแล้ว: ' + file.name);
      } else {
        showNotification('error', 'กรุณาเลือกไฟล์วิดีโอ');
      }
    }
  };

  const handleThumbnailFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedThumbnailFile(file);
        showNotification('info', 'เลือกไฟล์ thumbnail แล้ว: ' + file.name);
      } else {
        showNotification('error', 'กรุณาเลือกไฟล์รูปภาพ');
      }
    }
  };

  useEffect(() => {
    loadVideos();
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
  if (error || videos.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">จัดการวิดีโอ</h1>
            <p className="text-gray-600">อัพโหลดและจัดการวิดีโอ Portfolio</p>
          </div>
          <button
            onClick={() => {
              setEditingVideo(null);
              setSelectedVideoFile(null);
              setSelectedThumbnailFile(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <HiPlus className="w-5 h-5" />
            อัพโหลดวิดีโอใหม่
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="max-w-md mx-auto">
            <HiVideoCamera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error ? 'ไม่สามารถดึงข้อมูลวิดีโอได้' : 'ยังไม่มีวิดีโอ'}
            </h3>
            <p className="text-gray-600 mb-6">
              {error 
                ? 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' 
                : 'เริ่มต้นด้วยการอัพโหลดวิดีโอแรกของคุณ'
              }
            </p>
            <button
              onClick={() => {
                setEditingVideo(null);
                setSelectedVideoFile(null);
                setSelectedThumbnailFile(null);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors mx-auto"
            >
              <HiPlus className="w-5 h-5" />
              อัพโหลดวิดีโอแรก
            </button>
          </div>
        </div>

        {/* Upload Modal */}
        {showModal && (
          <VideoModal 
            video={editingVideo} 
            onClose={() => setShowModal(false)} 
            onSave={handleUpload}
            onVideoFileSelect={handleVideoFileSelect}
            onThumbnailFileSelect={handleThumbnailFileSelect}
            selectedVideoFile={selectedVideoFile}
            selectedThumbnailFile={selectedThumbnailFile}
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
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการวิดีโอ</h1>
          <p className="text-gray-600">อัพโหลดและจัดการวิดีโอ Portfolio</p>
        </div>
        <button
          onClick={() => {
            setEditingVideo(null);
            setSelectedVideoFile(null);
            setSelectedThumbnailFile(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <HiPlus className="w-5 h-5" />
          อัพโหลดวิดีโอใหม่
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="relative">
              <video
                src={video.video_url}
                className="w-full h-48 object-cover rounded-t-lg"
                muted
                loop
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <img
                src={video.thumbnail_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg=='}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg hidden"
                style={{ display: 'none' }}
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
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{video.title || 'ไม่มีชื่อ'}</h3>
              {video.subtitle && (
                <p className="text-sm text-gray-600 mb-2">{video.subtitle}</p>
              )}
              {video.brand && (
                <p className="text-xs text-gray-500 mb-2">Brand: {video.brand}</p>
              )}
              {video.duration && (
                <p className="text-xs text-gray-500 mb-4">Duration: {video.duration}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusToggle(video.id)}
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                    video.status === 'active'
                      ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {video.status === 'active' ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  {video.status === 'active' ? 'ซ่อน' : 'แสดง'}
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
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
        <VideoModal 
          video={editingVideo} 
          onClose={() => setShowModal(false)} 
          onSave={handleUpload}
          onVideoFileSelect={handleVideoFileSelect}
          onThumbnailFileSelect={handleThumbnailFileSelect}
          selectedVideoFile={selectedVideoFile}
          selectedThumbnailFile={selectedThumbnailFile}
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

// Video Modal Component
const VideoModal = ({ video, onClose, onSave, onVideoFileSelect, onThumbnailFileSelect, selectedVideoFile, selectedThumbnailFile, uploading }) => {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    subtitle: video?.subtitle || '',
    brand: video?.brand || '',
    duration: video?.duration || '',
    status: video?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              อัพโหลดวิดีโอใหม่
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อวิดีโอ
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำอธิบาย
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                แบรนด์
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ความยาว
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="เช่น 2:30"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลือกไฟล์วิดีโอ
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <HiVideoCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">คลิกเพื่อเลือกไฟล์วิดีโอ</p>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={onVideoFileSelect}
                  id="video-upload"
                  required
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm text-blue-600 hover:text-blue-500">
                    เลือกไฟล์วิดีโอ
                  </span>
                </label>
              </div>
              {selectedVideoFile && (
                <p className="text-sm text-gray-600 mt-2">
                  เลือกแล้ว: {selectedVideoFile.name} ({(selectedVideoFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลือกไฟล์ Thumbnail (บังคับ)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <HiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">คลิกเพื่อเลือกไฟล์รูปภาพ</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onThumbnailFileSelect}
                  id="thumbnail-upload"
                  required
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm text-blue-600 hover:text-blue-500">
                    เลือกไฟล์ Thumbnail
                  </span>
                </label>
              </div>
              {selectedThumbnailFile && (
                <p className="text-sm text-gray-600 mt-2">
                  เลือกแล้ว: {selectedThumbnailFile.name} ({(selectedThumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
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
                disabled={!selectedVideoFile || !selectedThumbnailFile || uploading}
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
    </div>
  );
};

export default AdminVideos; 