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
    console.log('🚀 Client API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Client API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Client API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Client API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const clientService = {
  // Get all clients
  getAllClients: async () => {
    try {
      const response = await api.get('/clients');
      return response.data;
    } catch (error) {
      console.error('Error fetching all clients:', error);
      throw error;
    }
  },

  // Get active clients only
  getActiveClients: async () => {
    try {
      const response = await api.get('/clients/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active clients:', error);
      throw error;
    }
  },

  // Get single client by ID
  getClientById: async (id) => {
    try {
      const response = await api.get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching client by ID:', error);
      throw error;
    }
  },

  // Create new client with logo upload
  createClient: async (file) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await api.post('/clients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  // Update client with logo upload
  updateClient: async (id, file) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('logo', file);
      }

      const response = await api.put(`/clients/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  // Delete client
  deleteClient: async (id) => {
    try {
      const response = await api.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  },

  // Update client order
  updateClientOrder: async (id, orderData) => {
    try {
      const response = await api.put(`/clients/${id}/order`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error updating client order:', error);
      throw error;
    }
  },

  // Toggle client status
  toggleClientStatus: async (id) => {
    try {
      const response = await api.put(`/clients/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error('Error toggling client status:', error);
      throw error;
    }
  },

  // Legacy upload method (for backward compatibility)
  uploadLogo: async (file) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await api.post('/clients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  },
};

export default clientService; 