import api from './api';

// Van Images API
export const vanImageService = {
  // Upload van image
  uploadImage: async (formData) => {
    try {
      const response = await api.post('/api/van-assets/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading van image:', error);
      throw error;
    }
  },

  // Get all van images
  getAllImages: async (category = null) => {
    try {
      const params = category ? { category } : {};
      const response = await api.get('/api/van-assets/images', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching van images:', error);
      throw error;
    }
  },

  // Get van image by ID
  getImageById: async (id) => {
    try {
      const response = await api.get(`/api/van-assets/images/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching van image:', error);
      throw error;
    }
  },

  // Update van image
  updateImage: async (id, data) => {
    try {
      const response = await api.put(`/api/van-assets/images/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating van image:', error);
      throw error;
    }
  },

  // Delete van image
  deleteImage: async (id) => {
    try {
      const response = await api.delete(`/api/van-assets/images/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting van image:', error);
      throw error;
    }
  },
};

// Van Videos API
export const vanVideoService = {
  // Upload van video
  uploadVideo: async (formData) => {
    try {
      const response = await api.post('/api/van-assets/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading van video:', error);
      throw error;
    }
  },

  // Get all van videos
  getAllVideos: async (category = null) => {
    try {
      const params = category ? { category } : {};
      const response = await api.get('/api/van-assets/videos', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching van videos:', error);
      throw error;
    }
  },

  // Get van video by ID
  getVideoById: async (id) => {
    try {
      const response = await api.get(`/api/van-assets/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching van video:', error);
      throw error;
    }
  },

  // Update van video
  updateVideo: async (id, data) => {
    try {
      const response = await api.put(`/api/van-assets/videos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating van video:', error);
      throw error;
    }
  },

  // Delete van video
  deleteVideo: async (id) => {
    try {
      const response = await api.delete(`/api/van-assets/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting van video:', error);
      throw error;
    }
  },
};

// Combined van asset service
export const vanAssetService = {
  // Get all van assets (images and videos)
  getAllAssets: async (category = null) => {
    try {
      const [images, videos] = await Promise.all([
        vanImageService.getAllImages(category),
        vanVideoService.getAllVideos(category)
      ]);
      
      return {
        images,
        videos,
        total: images.length + videos.length
      };
    } catch (error) {
      console.error('Error fetching van assets:', error);
      throw error;
    }
  },

  // Get active van assets only
  getActiveAssets: async (category = null) => {
    try {
      const [images, videos] = await Promise.all([
        vanImageService.getAllImages(category),
        vanVideoService.getAllVideos(category)
      ]);
      
      const activeImages = images.filter(img => img.status === 'active');
      const activeVideos = videos.filter(video => video.status === 'active');
      
      return {
        images: activeImages,
        videos: activeVideos,
        total: activeImages.length + activeVideos.length
      };
    } catch (error) {
      console.error('Error fetching active van assets:', error);
      throw error;
    }
  },
}; 