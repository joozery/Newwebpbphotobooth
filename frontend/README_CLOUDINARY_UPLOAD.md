# Cloudinary Upload Integration - คู่มือการใช้งาน

## ภาพรวม
ระบบได้เพิ่มการอัพโหลดรูปภาพไปยัง Cloudinary ก่อนบันทึกลิงก์ลงใน MySQL database

## การทำงานของระบบ

### 1. Flow การอัพโหลดรูปภาพ
```
1. ผู้ใช้เลือกไฟล์รูปภาพ
2. Frontend ส่งไฟล์ไปยัง Upload API
3. Backend อัพโหลดไปยัง Cloudinary
4. Cloudinary ส่ง URL กลับมา
5. Frontend ส่ง URL ไปยัง Product API
6. Backend บันทึก URL ลง MySQL database
```

### 2. API Endpoints สำหรับ Upload

#### อัพโหลดรูปภาพหลัก
```javascript
POST /api/upload/main
Content-Type: multipart/form-data

// Request
{
  image: File
}

// Response
{
  url: "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/filename.jpg"
}
```

#### อัพโหลดรูปภาพรายละเอียด
```javascript
POST /api/upload/details
Content-Type: multipart/form-data

// Request
{
  images: [File1, File2, File3, ...]
}

// Response
{
  urls: [
    "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/file1.jpg",
    "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/file2.jpg",
    "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/file3.jpg"
  ]
}
```

## การใช้งานใน Frontend

### 1. API Functions
```javascript
// src/services/api.js
export const uploadAPI = {
  // อัพโหลดรูปภาพหลัก
  uploadMainImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return api.post('/api/upload/main', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },
  
  // อัพโหลดรูปภาพรายละเอียด
  uploadDetailImages: (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    return api.post('/api/upload/details', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },
};
```

### 2. การใช้งานใน Component
```javascript
// อัพโหลดรูปภาพหลัก
const mainImageResponse = await uploadAPI.uploadMainImage(mainImageFile);
const mainImageUrl = mainImageResponse.data.url;

// อัพโหลดรูปภาพรายละเอียด
const detailImagesResponse = await uploadAPI.uploadDetailImages(detailImageFiles);
const detailImageUrls = detailImagesResponse.data.urls;

// ส่งข้อมูลสินค้าพร้อม URL รูปภาพ
const productData = {
  title: "ชื่อสินค้า",
  description: "คำอธิบาย",
  mainImage: mainImageUrl,
  detailImages: detailImageUrls,
  // ... ข้อมูลอื่นๆ
};
```

## Error Handling

### 1. Upload Errors
```javascript
try {
  const response = await uploadAPI.uploadMainImage(file);
  const imageUrl = response.data.url;
} catch (uploadErr) {
  console.error('Error uploading image:', uploadErr);
  // ใช้รูปภาพ default
  imageUrl = '/src/assets/photobooth.jpg';
}
```

### 2. Network Errors
- หากไม่สามารถเชื่อมต่อกับ Upload API ได้
- ระบบจะใช้รูปภาพ default
- แสดงข้อความแจ้งเตือนผู้ใช้

## Loading States

### 1. Upload Loading
```javascript
const [uploading, setUploading] = useState(false);

// ในฟังก์ชัน upload
setUploading(true);
try {
  // อัพโหลดรูปภาพ
} finally {
  setUploading(false);
}
```

### 2. UI Loading
```javascript
<button disabled={uploading}>
  {uploading ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      กำลังอัพโหลด...
    </>
  ) : (
    'บันทึก'
  )}
</button>
```

## การตั้งค่า Backend

### 1. Cloudinary Configuration
```javascript
// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pbphotobooth',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});
```

### 2. Multer Configuration
```javascript
const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const upload = multer({ storage });
```

## การทดสอบ

### 1. ทดสอบ Upload API
```bash
# อัพโหลดรูปภาพหลัก
curl -X POST https://your-api.com/api/upload/main \
  -F "image=@/path/to/image.jpg"

# อัพโหลดรูปภาพรายละเอียด
curl -X POST https://your-api.com/api/upload/details \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

### 2. ทดสอบใน Frontend
1. เปิดหน้า Products/Services
2. คลิก "เพิ่มสินค้าใหม่"
3. เลือกรูปภาพหลักและรูปภาพรายละเอียด
4. กรอกข้อมูลสินค้า
5. คลิก "เพิ่มสินค้า"
6. ตรวจสอบ console logs สำหรับ upload progress

## การแก้ไขปัญหา

### ปัญหา: รูปภาพไม่อัพโหลด
1. ตรวจสอบ Cloudinary credentials
2. ตรวจสอบ file size และ format
3. ตรวจสอบ network connection
4. ดู error logs ใน backend

### ปัญหา: URL ไม่ถูกบันทึก
1. ตรวจสอบ response จาก Upload API
2. ตรวจสอบการส่งข้อมูลไป Product API
3. ตรวจสอบ database connection

### ปัญหา: Loading ไม่หาย
1. ตรวจสอบ error handling
2. ตรวจสอบ finally block
3. ตรวจสอบ state management

## Best Practices

### 1. File Validation
- ตรวจสอบ file size (ไม่เกิน 5MB)
- ตรวจสอบ file type (JPG, PNG เท่านั้น)
- ตรวจสอบ file name

### 2. Error Handling
- ใช้ try-catch สำหรับ upload operations
- มี fallback สำหรับรูปภาพ default
- แสดงข้อความ error ที่ชัดเจน

### 3. User Experience
- แสดง loading state ระหว่างอัพโหลด
- แสดง progress indicator
- แสดงข้อความสำเร็จ/ไม่สำเร็จ

### 4. Performance
- ใช้ image compression
- ใช้ lazy loading สำหรับรูปภาพ
- ใช้ CDN สำหรับรูปภาพ 