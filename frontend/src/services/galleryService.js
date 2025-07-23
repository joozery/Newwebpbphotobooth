import axios from 'axios';

const API_BASE_URL = 'https://pbbackend-api-4e56bf125d15.herokuapp.com/api/gallery';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

// Fetch all gallery images
export const fetchGalleryImages = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    if (error.response) {
      throw new Error(`ไม่สามารถโหลดรูปภาพได้: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } else {
      throw new Error('เกิดข้อผิดพลาดในการโหลดรูปภาพ');
    }
  }
};

// Upload new image
export const uploadGalleryImage = async (file, status = 'active') => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('status', status);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log('Upload progress:', percentCompleted + '%');
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    if (error.response) {
      throw new Error(`อัพโหลดรูปภาพล้มเหลว: ${error.response.data?.error || error.response.status}`);
    } else if (error.request) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } else {
      throw new Error('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ');
    }
  }
};

// Upload multiple images
export const uploadMultipleGalleryImages = async (files, status = 'active') => {
  try {
    const uploadPromises = files.map(file => uploadGalleryImage(file, status));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw new Error('อัพโหลดรูปภาพหลายภาพล้มเหลว');
  }
};

// Update image status
export const updateImageStatus = async (id, status) => {
  try {
    const response = await api.put(`/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating image status:', error);
    if (error.response) {
      throw new Error(`อัพเดทสถานะล้มเหลว: ${error.response.data?.error || error.response.status}`);
    } else if (error.request) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } else {
      throw new Error('เกิดข้อผิดพลาดในการอัพเดทสถานะ');
    }
  }
};

// Delete image
export const deleteGalleryImage = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    if (error.response) {
      throw new Error(`ลบรูปภาพล้มเหลว: ${error.response.data?.error || error.response.status}`);
    } else if (error.request) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } else {
      throw new Error('เกิดข้อผิดพลาดในการลบรูปภาพ');
    }
  }
};

// Get image by ID (if needed in the future)
export const getGalleryImage = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    if (error.response) {
      throw new Error(`ไม่สามารถโหลดรูปภาพได้: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } else {
      throw new Error('เกิดข้อผิดพลาดในการโหลดรูปภาพ');
    }
  }
}; 