import api from './api';

export const googleReviewsService = {
  // Get all Google reviews
  getReviews: async () => {
    try {
      const response = await api.get('/api/google-reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      throw error;
    }
  },

  // Get reviews with specific parameters
  getReviewsWithParams: async (params = {}) => {
    try {
      const response = await api.get('/api/google-reviews', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching Google reviews with params:', error);
      throw error;
    }
  }
}; 