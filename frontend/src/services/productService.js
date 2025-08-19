import axios from 'axios';

// สร้าง axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://pbbackend-api-4e56bf125d15.herokuapp.com',
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Product API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Product API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Product API Error:', error.response?.status, error.response?.data);
    
    // จัดการ error ที่เฉพาะเจาะจง
    if (error.response?.status === 404) {
      console.error('Product API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    } else if (!error.response) {
      console.error('Network error - no response from server');
    }
    
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // ดึงสินค้าทั้งหมด
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/products');
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response) {
        throw new Error(`ไม่สามารถโหลดสินค้าได้: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการโหลดสินค้า');
      }
    }
  },
  
  // ดึงสินค้าตาม ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      if (error.response) {
        throw new Error(`ไม่สามารถโหลดสินค้าได้: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการโหลดสินค้า');
      }
    }
  },
  
  // เพิ่มสินค้าใหม่
  createProduct: async (productData) => {
    try {
      const response = await api.post('/api/products', productData);
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.response) {
        throw new Error(`เพิ่มสินค้าล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
      }
    }
  },
  
  // อัพเดทสินค้า
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/api/products/${id}`, productData);
      return response;
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response) {
        throw new Error(`อัพเดทสินค้าล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการอัพเดทสินค้า');
      }
    }
  },
  
  // ลบสินค้า
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/api/products/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error.response) {
        throw new Error(`ลบสินค้าล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการลบสินค้า');
      }
    }
  },
};

// Upload API functions
export const uploadAPI = {
  // อัพโหลดรูปภาพหลัก
  uploadMainImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log('Main image upload progress:', percentCompleted + '%');
        },
      });
      
      return response;
    } catch (error) {
      console.error('Error uploading main image:', error);
      if (error.response) {
        throw new Error(`อัพโหลดรูปภาพหลักล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพหลัก');
      }
    }
  },
  
  // อัพโหลดรูปภาพรายละเอียด
  uploadDetailImages: async (files) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });
      
      const response = await api.post('/api/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log('Detail images upload progress:', percentCompleted + '%');
        },
      });
      
      return response;
    } catch (error) {
      console.error('Error uploading detail images:', error);
      if (error.response) {
        throw new Error(`อัพโหลดรูปภาพรายละเอียดล้มเหลว: ${error.response.data?.error || error.response.status}`);
      } else if (error.request) {
        throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      } else {
        throw new Error('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพรายละเอียด');
      }
    }
  },
};

// Legacy functions for backward compatibility
export const fetchProducts = async () => {
  try {
    const response = await productAPI.getAllProducts();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await productAPI.updateProduct(id, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await productAPI.deleteProduct(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await productAPI.getProductById(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 