import axios from 'axios';

// สร้าง axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://pbweb.devwooyou.space',
  timeout: 120000, // 120 seconds timeout for large video uploads
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Video API Request:', config.method?.toUpperCase(), config.url);
    console.log('📡 Base URL:', config.baseURL);
    console.log('🔗 Full URL:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('❌ Video API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Video API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Video API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    
    // จัดการ error ที่เฉพาะเจาะจง
    if (error.response?.status === 404) {
      console.error('🔍 Video API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('💥 Server error');
    } else if (!error.response) {
      console.error('🌐 Network error - no response from server');
    }
    
    return Promise.reject(error);
  }
);

// Video API functions
export const videoAPI = {
  // ดึงวิดีโอทั้งหมด
  getAllVideos: async () => {
    try {
      console.log('🔄 Fetching videos from API...');
      const response = await api.get('/api/videos');
      console.log('✅ Videos fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching videos:', error);
      
      if (error.response) {
        throw new Error(`ไม่สามารถโหลดวิดีโอได้: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ - กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการโหลดวิดีโอ: ' + error.message);
      }
    }
  },
  
  // ดึงวิดีโอตาม ID
  getVideoById: async (id) => {
    try {
      const response = await api.get(`/api/videos/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching video:', error);
      if (error.response) {
        throw new Error(`ไม่สามารถโหลดวิดีโอได้: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการโหลดวิดีโอ');
      }
    }
  },
  
  // อัพโหลดวิดีโอใหม่ - ปรับให้ตรงกับ backend uploadHandler
  uploadVideo: async (videoFile, thumbnailFile, videoData) => {
    try {
      console.log('🔄 Uploading video:', videoFile.name);
      console.log('📥 Upload data:', { title: videoData.title, videoSize: videoFile.size, hasThumbnail: !!thumbnailFile });
      
      // ตรวจสอบว่ามีไฟล์ครบตามที่ backend ต้องการ
      if (!videoFile) {
        throw new Error('กรุณาเลือกไฟล์วิดีโอ');
      }
      
      if (!thumbnailFile) {
        throw new Error('กรุณาเลือกไฟล์ thumbnail (บังคับ)');
      }
      
      const formData = new FormData();
      
      // ชื่อ field ต้องตรงกับ backend EXACTLY - ทั้งสองไฟล์บังคับ
      formData.append('video', videoFile); // ✅ ตรงกับ multer.fields name
      formData.append('thumbnail', thumbnailFile); // ✅ บังคับตาม backend ใหม่
      
      // Add video data - ตรงกับ backend req.body
      formData.append('title', videoData.title || '');
      formData.append('subtitle', videoData.subtitle || '');
      formData.append('brand', videoData.brand || '');
      formData.append('duration', videoData.duration || '');
      formData.append('status', videoData.status || 'active');

      // Debug: แสดงข้อมูลที่ส่ง
      console.log('📤 FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}:`, value.name, `(${value.size} bytes, ${value.type})`);
        } else {
          console.log(`  ${key}:`, value);
        }
      }

      const response = await api.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log('📤 Video upload progress:', percentCompleted + '%');
        },
      });
      
      console.log('✅ Video uploaded successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error uploading video:', error);
      
      // จัดการ error ที่เฉพาะเจาะจงจาก backend
      if (error.response?.data?.error) {
        if (error.response.data.error === 'Video upload failed') {
          throw new Error('อัพโหลดวิดีโอล้มเหลว: ' + (error.response.data.detail || 'ไฟล์วิดีโอมีปัญหา'));
        } else if (error.response.data.error === 'Thumbnail upload failed') {
          throw new Error('อัพโหลด thumbnail ล้มเหลว: ' + (error.response.data.detail || 'ไฟล์รูปภาพมีปัญหา'));
        } else if (error.response.data.error === 'Missing file(s)') {
          throw new Error('กรุณาเลือกไฟล์วิดีโอและ thumbnail ทั้งสองไฟล์');
        } else if (error.response.data.error === 'Missing upload data') {
          throw new Error('ข้อมูลการอัพโหลดไม่ครบถ้วน');
        } else {
          throw new Error(`อัพโหลดล้มเหลว: ${error.response.data.error} - ${error.response.data.detail || ''}`);
        }
      } else if (error.response) {
        throw new Error(`อัพโหลดวิดีโอล้มเหลว: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการอัพโหลดวิดีโอ: ' + error.message);
      }
    }
  },
  
  // อัพเดทวิดีโอ - ตรงกับ backend PUT /:id
  updateVideo: async (id, videoData) => {
    try {
      console.log('🔄 Updating video:', id, videoData);
      const response = await api.put(`/api/videos/${id}`, videoData);
      console.log('✅ Video updated successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error updating video:', error);
      if (error.response) {
        throw new Error(`อัพเดทวิดีโอล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการอัพเดทวิดีโอ');
      }
    }
  },
  
  // ลบวิดีโอ - ตรงกับ backend DELETE /:id
  deleteVideo: async (id) => {
    try {
      console.log('🔄 Deleting video:', id);
      const response = await api.delete(`/api/videos/${id}`);
      console.log('✅ Video deleted successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error deleting video:', error);
      if (error.response) {
        throw new Error(`ลบวิดีโอล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการลบวิดีโอ');
      }
    }
  },
};

// Legacy functions for backward compatibility
export const fetchVideos = async () => {
  try {
    const response = await videoAPI.getAllVideos();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadVideo = async (videoFile, thumbnailFile, videoData) => {
  try {
    const response = await videoAPI.uploadVideo(videoFile, thumbnailFile, videoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVideo = async (id, videoData) => {
  try {
    const response = await videoAPI.updateVideo(id, videoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVideo = async (id) => {
  try {
    const response = await videoAPI.deleteVideo(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideo = async (id) => {
  try {
    const response = await videoAPI.getVideoById(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 