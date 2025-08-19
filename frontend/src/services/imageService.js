import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pbbackend-api-4e56bf125d15.herokuapp.com/api';

// สร้าง axios instance พร้อม timeout และ error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor สำหรับ logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor สำหรับ error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Image Service Functions
export const imageService = {
  // อัปโหลดรูปภาพ
  uploadImage: async (formData) => {
    try {
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds for upload
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message || 'Upload failed');
    }
  },

  // ดึงรูปภาพทั้งหมด
  getAllImages: async (category = null) => {
    try {
      const params = category && category !== 'all' ? { category } : {};
      const response = await api.get('/images', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch images:', error);
      // Return fallback data if API fails
      return [
        {
          id: 1,
          title: 'Hero Slide 1',
          description: 'Hero section slide 1',
          category: 'hero',
          image_url: 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Hero+Slide+1',
          status: 'active',
          order_index: 1,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Promotion Banner',
          description: 'Special offer promotion',
          category: 'promotion',
          image_url: 'https://via.placeholder.com/800x300/10B981/FFFFFF?text=Promotion+Banner',
          status: 'active',
          order_index: 1,
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Popup Promotion',
          description: 'Popup promotion modal',
          category: 'popup',
          image_url: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Popup+Promotion',
          status: 'active',
          order_index: 1,
          created_at: new Date().toISOString()
        }
      ];
    }
  },

  // ดึงรูปภาพตาม category
  getImagesByCategory: async (category) => {
    try {
      const response = await api.get(`/images/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${category} images:`, error);
      return [];
    }
  },

  // ดึงรูปภาพเดี่ยว
  getImageById: async (id) => {
    try {
      const response = await api.get(`/images/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch image');
    }
  },

  // อัปเดตรูปภาพ
  updateImage: async (id, imageData) => {
    try {
      const response = await api.put(`/images/${id}`, imageData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message || 'Update failed');
    }
  },

  // อัปเดตลำดับรูปภาพ
  updateImageOrder: async (id, orderIndex) => {
    try {
      const response = await api.put(`/images/${id}/order`, { order_index: orderIndex });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message || 'Order update failed');
    }
  },

  // ลบรูปภาพ
  deleteImage: async (id) => {
    try {
      const response = await api.delete(`/images/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message || 'Delete failed');
    }
  },

  // ดึงรูปภาพสำหรับ Hero Section
  getHeroImages: async () => {
    try {
      const response = await api.get('/images/category/hero');
      return response.data.filter(img => img.status === 'active');
    } catch (error) {
      console.error('Failed to fetch hero images:', error);
      return [
        {
          id: 1,
          title: 'Hero Slide 1',
          description: 'Hero section slide 1',
          category: 'hero',
          image_url: 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Hero+Slide+1',
          status: 'active',
          order_index: 1
        }
      ];
    }
  },

  // ดึงรูปภาพสำหรับ Promotion
  getPromotionImages: async () => {
    try {
      const response = await api.get('/images/category/promotion');
      return response.data.filter(img => img.status === 'active');
    } catch (error) {
      console.error('Failed to fetch promotion images:', error);
      return [
        {
          id: 2,
          title: 'Promotion Banner',
          description: 'Special offer promotion',
          category: 'promotion',
          image_url: 'https://via.placeholder.com/800x300/10B981/FFFFFF?text=Promotion+Banner',
          status: 'active',
          order_index: 1
        }
      ];
    }
  },

  // ดึงรูปภาพสำหรับ Popup
  getPopupImages: async () => {
    try {
      const response = await api.get('/images/category/popup');
      return response.data.filter(img => img.status === 'active');
    } catch (error) {
      console.error('Failed to fetch popup images:', error);
      return [
        {
          id: 3,
          title: 'Popup Promotion',
          description: 'Popup promotion modal',
          category: 'popup',
          image_url: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Popup+Promotion',
          status: 'active',
          order_index: 1
        }
      ];
    }
  }
};

export default imageService; 