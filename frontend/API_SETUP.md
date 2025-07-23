# API Setup Guide

## การติดตั้งและเชื่อมต่อ API

### 1. ติดตั้ง Dependencies
```bash
npm install axios
```

### 2. Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ `frontend/`:
```env
VITE_API_BASE_URL=https://pbbackend-api-4e56bf125d15.herokuapp.com
```

### 3. ไฟล์ที่สร้าง/แก้ไข

#### `src/services/api.js`
- สร้าง axios instance
- กำหนด base URL
- เพิ่ม interceptors สำหรับ logging
- สร้าง API functions

#### `src/components/admin/AdminProducts.jsx`
- เพิ่มการเชื่อมต่อ API
- เพิ่ม loading และ error states
- ปรับปรุง CRUD operations
- เพิ่ม file upload support

### 4. การใช้งาน

#### ดึงข้อมูลสินค้า
```javascript
const response = await productAPI.getAllProducts();
const products = response.data;
```

#### เพิ่มสินค้าใหม่
```javascript
const productData = new FormData();
productData.append('title', 'ชื่อสินค้า');
productData.append('description', 'คำอธิบาย');
// ... เพิ่มข้อมูลอื่นๆ

const response = await productAPI.createProduct(productData);
```

#### อัพเดทสินค้า
```javascript
const response = await productAPI.updateProduct(id, productData);
```

#### ลบสินค้า
```javascript
const response = await productAPI.deleteProduct(id);
```

### 5. Error Handling
- Network errors
- Server errors (404, 500)
- Validation errors
- File upload errors

### 6. File Upload
- รองรับรูปภาพหลัก (mainImage)
- รองรับรูปภาพรายละเอียดหลายไฟล์ (detailImages)
- ใช้ FormData สำหรับ file upload
- รองรับ JPG, PNG ขนาดไม่เกิน 5MB

### 7. การทดสอบ
1. เปิด Developer Tools (F12)
2. ดู Console สำหรับ API logs
3. ตรวจสอบ Network tab สำหรับ API calls
4. ทดสอบ CRUD operations

### 8. Troubleshooting

#### ปัญหา: ไม่สามารถเชื่อมต่อ API ได้
- ตรวจสอบ URL ใน .env file
- ตรวจสอบ internet connection
- ตรวจสอบ CORS settings ใน backend

#### ปัญหา: File upload ไม่ทำงาน
- ตรวจสอบ Content-Type header
- ตรวจสอบ file size
- ตรวจสอบ file format

#### ปัญหา: ข้อมูลไม่แสดง
- ตรวจสอบ API response format
- ตรวจสอบ data mapping
- ตรวจสอบ console errors 