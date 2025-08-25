import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pbphotobooth-backend-2-a50dde720de0.herokuapp.com/api';

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
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const heroSlideService = {
  // Get all hero slides
  getAllSlides: async () => {
    try {
      const response = await api.get('/hero-slides');
      return response.data;
    } catch (error) {
      console.error('Error fetching all slides:', error);
      throw error;
    }
  },

  // Get active hero slides only
  getActiveSlides: async () => {
    try {
      const response = await api.get('/hero-slides/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active slides:', error);
      throw error;
    }
  },

  // Get single hero slide by ID
  getSlideById: async (id) => {
    try {
      const response = await api.get(`/hero-slides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching slide by ID:', error);
      throw error;
    }
  },

  // Create new hero slide with image upload
  createSlide: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/hero-slides', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating slide:', error);
      throw error;
    }
  },

  // Update hero slide with image upload
  updateSlide: async (id, file) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      }
      
      const response = await api.put(`/hero-slides/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating slide:', error);
      throw error;
    }
  },

  // Delete hero slide
  deleteSlide: async (id) => {
    try {
      const response = await api.delete(`/hero-slides/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting slide:', error);
      throw error;
    }
  },

  // Update slide order
  updateSlideOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/hero-slides/${id}/order`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating slide order:', error);
      throw error;
    }
  },

  // Toggle slide status
  toggleSlideStatus: async (id) => {
    try {
      const response = await api.put(`/hero-slides/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error('Error toggling slide status:', error);
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
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};

export default heroSlideService; 