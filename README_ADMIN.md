# PB PhotoBooth Admin System

ระบบจัดการหลังบ้านสำหรับ PB PhotoBooth Website

## 🚀 การติดตั้ง

### 1. Backend Setup

```bash
cd backend
npm install
```

สร้างไฟล์ `.env` จาก `env.example`:
```bash
cp env.example .env
```

แก้ไขไฟล์ `.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pbphotobooth
DB_PORT=3306

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Database Setup

รัน SQL scripts ใน `backend/database/`:
- `images.sql`
- `hero_slides.sql`

## 🏃‍♂️ การรัน

### Backend
```bash
cd backend
npm run dev  # Development
npm start    # Production
```

### Frontend
```bash
cd frontend
npm run dev
```

## 📱 การใช้งาน

### เข้าสู่ระบบจัดการ
ไปที่: `http://localhost:3000/admin`

### ฟีเจอร์ที่มี

#### 1. Hero Slides Management
- เพิ่ม/แก้ไข/ลบ Hero Slides
- จัดลำดับการแสดงผล
- เปิด/ปิดการใช้งาน
- อัพโหลดรูปภาพ

#### 2. Products Management
- จัดการสินค้า/บริการ
- เพิ่มคุณสมบัติและรายละเอียดทางเทคนิค
- จัดการรูปภาพสินค้า

#### 3. Gallery Management
- จัดการรูปภาพแกลลอรี่
- จัดหมวดหมู่รูปภาพ
- จัดลำดับการแสดงผล

#### 4. Videos Management
- จัดการวิดีโอพอร์ตโฟลิโอ
- อัพโหลดวิดีโอและ thumbnail
- จัดการข้อมูลวิดีโอ

#### 5. Images Management
- จัดการรูปภาพทั่วไป
- จัดหมวดหมู่และลำดับ
- อัพโหลดรูปภาพ

## 🔧 การแก้ไขปัญหา

### H27 Timeout Errors
หากเจอ H27 errors บน Heroku:

1. **เพิ่ม Timeout Configuration**
   - Backend มี timeout 30 วินาทีแล้ว
   - Database connection pooling ถูกตั้งค่าแล้ว

2. **ตรวจสอบ Database Connection**
   - ตรวจสอบ environment variables
   - ตรวจสอบ database credentials

3. **เพิ่ม Dyno Resources**
   - อัพเกรด Heroku dyno เป็นขนาดใหญ่ขึ้น
   - เพิ่ม database add-on

### Database Connection Issues
```bash
# ตรวจสอบ connection
curl http://localhost:5000/health
```

### CORS Issues
ตรวจสอบ `CORS_ORIGIN` ใน `.env` file

## 📁 โครงสร้างไฟล์

```
backend/
├── server.js              # Main server file
├── db/
│   └── db.js             # Database connection
├── routes/
│   ├── productRoutes.js  # Products API
│   ├── heroSlides.js     # Hero slides API
│   ├── images.js         # Images API
│   └── videos.js         # Videos API
├── utils/
│   └── cloudinaryConfig.js # Cloudinary setup
└── database/
    ├── images.sql        # Images table
    └── hero_slides.sql   # Hero slides table

frontend/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx
│   │   └── admin/
│   │       ├── AdminSidebar.jsx
│   │       ├── AdminHeroSlides.jsx
│   │       ├── AdminProducts.jsx
│   │       └── ...
│   └── services/
│       ├── heroSlideService.js
│       ├── productService.js
│       └── ...
```

## 🔐 Security

- ใช้ environment variables สำหรับ sensitive data
- CORS configuration สำหรับ frontend
- Database connection pooling
- Input validation และ sanitization

## 📊 Performance

- Database connection pooling
- Request timeout configuration
- File upload limits
- Error handling และ logging

## 🚀 Deployment

### Heroku
```bash
# Backend
heroku create pbbackend-api
heroku config:set NODE_ENV=production
heroku config:set DB_HOST=your_db_host
# ... set other environment variables
git push heroku main

# Frontend
# Deploy to Netlify หรือ Vercel
```

### Environment Variables สำหรับ Production
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📞 Support

หากมีปัญหาหรือคำถาม:
- ตรวจสอบ logs ใน Heroku dashboard
- ตรวจสอบ database connection
- ตรวจสอบ environment variables
- ตรวจสอบ CORS configuration 