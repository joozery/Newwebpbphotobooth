import axios from 'axios';

// สร้าง axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://pbweb.devwooyou.space',
  timeout: 30000, // 30 seconds timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    console.log('📡 Base URL:', config.baseURL);
    console.log('🔗 Full URL:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
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
      console.error('🔍 API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('💥 Server error');
    } else if (!error.response) {
      console.error('🌐 Network error - no response from server');
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const productAPI = {
  // ดึงสินค้าทั้งหมด
  getAllProducts: async () => {
    try {
      console.log('🔄 Fetching products from API...');
      const response = await api.get('/api/products');
      console.log('✅ Products fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      
      // ลองใช้ endpoint อื่น
      try {
        console.log('🔄 Trying alternative endpoint: /products');
        const altResponse = await api.get('/products');
        console.log('✅ Products fetched from alternative endpoint:', altResponse.data);
        return altResponse;
      } catch (altError) {
        console.error('❌ Alternative endpoint also failed:', altError);
        
        if (error.response) {
          throw new Error(`ไม่สามารถโหลดสินค้าได้: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ - กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
        } else {
          throw new Error('เกิดข้อผิดพลาดในการโหลดสินค้า: ' + error.message);
        }
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
      console.log('🔄 Creating product:', productData);
      const response = await api.post('/api/products', productData);
      console.log('✅ Product created successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error creating product:', error);
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
      console.log('🔄 Updating product:', id, productData);
      const response = await api.put(`/api/products/${id}`, productData);
      console.log('✅ Product updated successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error updating product:', error);
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
      console.log('🔄 Deleting product:', id);
      const response = await api.delete(`/api/products/${id}`);
      console.log('✅ Product deleted successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error deleting product:', error);
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
      console.log('🔄 Uploading main image:', file.name);
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
          console.log('📤 Main image upload progress:', percentCompleted + '%');
        },
      });
      
      console.log('✅ Main image uploaded successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error uploading main image:', error);
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
      console.log('🔄 Uploading detail images:', files.length, 'files');
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
          console.log('📤 Detail images upload progress:', percentCompleted + '%');
        },
      });
      
      console.log('✅ Detail images uploaded successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error uploading detail images:', error);
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

export default api; 