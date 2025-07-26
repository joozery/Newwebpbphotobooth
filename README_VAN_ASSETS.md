# Van Assets Management System

ระบบจัดการภาพและวิดีโอของ Van สำหรับ Photobooth

## ฟีเจอร์

### Backend API
- **Upload Images**: อัพโหลดภาพของ van
- **Upload Videos**: อัพโหลดวิดีโอของ van
- **CRUD Operations**: สร้าง, อ่าน, แก้ไข, ลบ
- **Category Management**: จัดหมวดหมู่ (exterior, interior, setup, tour, general)
- **Status Management**: เปิด/ปิดการแสดงผล
- **Order Management**: จัดลำดับการแสดงผล

### Frontend Admin
- **Dashboard Integration**: รวมเข้ากับ Admin Dashboard
- **Tab Interface**: แยกการจัดการภาพและวิดีโอ
- **Upload Modal**: Modal สำหรับอัพโหลดไฟล์
- **Edit Modal**: Modal สำหรับแก้ไขข้อมูล
- **Preview**: แสดงตัวอย่างภาพและวิดีโอ
- **Bulk Operations**: จัดการหลายรายการพร้อมกัน

## API Endpoints

### Van Images
```
POST   /api/van-assets/upload-image    # อัพโหลดภาพ
GET    /api/van-assets/images          # ดึงภาพทั้งหมด
GET    /api/van-assets/images/:id      # ดึงภาพตาม ID
PUT    /api/van-assets/images/:id      # แก้ไขภาพ
DELETE /api/van-assets/images/:id      # ลบภาพ
```

### Van Videos
```
POST   /api/van-assets/upload-video    # อัพโหลดวิดีโอ
GET    /api/van-assets/videos          # ดึงวิดีโอทั้งหมด
GET    /api/van-assets/videos/:id      # ดึงวิดีโอตาม ID
PUT    /api/van-assets/videos/:id      # แก้ไขวิดีโอ
DELETE /api/van-assets/videos/:id      # ลบวิดีโอ
```

## Database Schema

### van_images Table
```sql
CREATE TABLE van_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) DEFAULT 'general',
  image_url VARCHAR(500) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### van_videos Table
```sql
CREATE TABLE van_videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) DEFAULT 'general',
  video_url VARCHAR(500) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## การใช้งาน

### 1. ติดตั้ง Database
```bash
# รัน SQL script
mysql -u username -p database_name < backend/database/van_assets.sql
```

### 2. เริ่มต้น Server
```bash
cd backend
npm install
npm start
```

### 3. เข้าใช้งาน Admin Dashboard
- ไปที่ `/admin` ใน frontend
- เลือก "Van Assets" จากเมนู
- ใช้ฟีเจอร์ต่างๆ ในการจัดการ

## หมวดหมู่ (Categories)

- **exterior**: ภาพ/วิดีโอภายนอก van
- **interior**: ภาพ/วิดีโอภายใน van
- **setup**: ภาพ/วิดีโอการติดตั้ง
- **tour**: ภาพ/วิดีโอการเดินชม
- **general**: หมวดหมู่อื่นๆ

## File Upload Limits

- **Images**: สูงสุด 10MB
- **Videos**: สูงสุด 100MB
- **Supported Formats**: 
  - Images: JPG, PNG, GIF, WebP
  - Videos: MP4, MOV, AVI, WebM

## Cloudinary Storage

ไฟล์จะถูกอัพโหลดไปยัง Cloudinary ในโฟลเดอร์:
- **Images**: `van-assets/images/`
- **Videos**: `van-assets/videos/`

## การพัฒนาเพิ่มเติม

### Frontend Components
- `AdminVanAssets.jsx`: หน้าจัดการหลัก
- `vanAssetService.js`: Service สำหรับเรียก API

### Backend Routes
- `vanAssets.js`: API routes สำหรับ van assets

### Database
- `van_assets.sql`: Schema และข้อมูลตัวอย่าง

## การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **Upload Failed**
   - ตรวจสอบขนาดไฟล์
   - ตรวจสอบรูปแบบไฟล์
   - ตรวจสอบ Cloudinary credentials

2. **Database Error**
   - ตรวจสอบการเชื่อมต่อ database
   - ตรวจสอบ schema
   - ตรวจสอบ permissions

3. **CORS Error**
   - ตรวจสอบ CORS configuration ใน backend
   - ตรวจสอบ origin ใน frontend

## การทดสอบ

### API Testing
```bash
# ทดสอบอัพโหลดภาพ
curl -X POST http://localhost:5000/api/van-assets/upload-image \
  -F "image=@test-image.jpg" \
  -F "title=Test Image" \
  -F "category=exterior"

# ทดสอบดึงข้อมูล
curl http://localhost:5000/api/van-assets/images
```

### Frontend Testing
- ทดสอบการอัพโหลดไฟล์
- ทดสอบการแก้ไขข้อมูล
- ทดสอบการลบข้อมูล
- ทดสอบการเปลี่ยนสถานะ 