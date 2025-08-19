import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pbbackend-api-4e56bf125d15.herokuapp.com/api';

// Create axios instance with timeout
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Promotion API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Promotion Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Promotion API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Promotion Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const promotionSlideService = {
  // Get all promotion slides
  getAllSlides: async () => {
    try {
      const response = await api.get('/promotion-slides');
      return response.data;
    } catch (error) {
      console.error('Error fetching all promotion slides:', error);
      throw error;
    }
  },

  // Get active promotion slides only
  getActiveSlides: async () => {
    try {
      const response = await api.get('/promotion-slides/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active promotion slides:', error);
      throw error;
    }
  },

  // Get single promotion slide by ID
  getSlideById: async (id) => {
    try {
      const response = await api.get(`/promotion-slides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching promotion slide by ID:', error);
      throw error;
    }
  },

  // Create new promotion slide with image upload
  createSlide: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/promotion-slides', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating promotion slide:', error);
      throw error;
    }
  },

  // Update promotion slide with image upload
  updateSlide: async (id, file) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      }
      
      const response = await api.put(`/promotion-slides/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating promotion slide:', error);
      throw error;
    }
  },

  // Delete promotion slide
  deleteSlide: async (id) => {
    try {
      const response = await api.delete(`/promotion-slides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting promotion slide:', error);
      throw error;
    }
  },

  // Update slide order
  updateSlideOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/promotion-slides/${id}/order`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating promotion slide order:', error);
      throw error;
    }
  },

  // Toggle slide status
  toggleSlideStatus: async (id) => {
    try {
      const response = await api.put(`/promotion-slides/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error('Error toggling promotion slide status:', error);
      throw error;
    }
  },

  // Upload image to S3 (updated method)
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading promotion image:', error);
      throw error;
    }
  },
};

export default promotionSlideService; 