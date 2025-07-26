# Van Assets Deployment Guide

## ปัญหาที่พบ
Error 404 เมื่อเรียก API `/van-assets/upload-video` เนื่องจาก Heroku deployment ยังไม่ได้อัพเดท code ใหม่

## วิธีแก้ไข

### 1. ตรวจสอบ Local Development
```bash
# ตรวจสอบว่า backend ทำงานได้
cd backend
npm start

# ทดสอบ API endpoint
curl -X POST http://localhost:5000/api/van-assets/upload-video \
  -F "video=@test-video.mp4" \
  -F "title=Test Video" \
  -F "category=general"
```

### 2. Deploy to Heroku

#### วิธีที่ 1: ใช้ Heroku CLI
```bash
# Login to Heroku
heroku login

# Navigate to backend directory
cd backend

# Add Heroku remote (ถ้ายังไม่มี)
heroku git:remote -a pbbackend-api-4e56bf125d15

# Commit changes
git add .
git commit -m "Add van assets management routes"

# Deploy to Heroku
git push heroku main
```

#### วิธีที่ 2: ใช้ Heroku Dashboard
1. ไปที่ [Heroku Dashboard](https://dashboard.heroku.com/)
2. เลือก app `pbbackend-api-4e56bf125d15`
3. ไปที่ Deploy tab
4. Connect GitHub repository
5. Enable automatic deploys หรือ manual deploy

### 3. ตรวจสอบ Database Schema
```sql
-- ตรวจสอบว่าตารางมีอยู่หรือไม่
SHOW TABLES LIKE 'van_%';

-- ถ้าไม่มี ให้รัน SQL script
-- ดูไฟล์ backend/database/van_assets.sql
```

### 4. ตรวจสอบ Environment Variables
ตรวจสอบว่า Heroku มี environment variables ที่จำเป็น:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ORIGIN`

### 5. ทดสอบ API หลัง Deploy
```bash
# ทดสอบ health check
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/health

# ทดสอบ van assets endpoints
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/images
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/videos
```

## API Endpoints ที่เพิ่มใหม่

### Van Images
```
POST   /api/van-assets/upload-image
GET    /api/van-assets/images
GET    /api/van-assets/images/:id
PUT    /api/van-assets/images/:id
DELETE /api/van-assets/images/:id
```

### Van Videos
```
POST   /api/van-assets/upload-video
GET    /api/van-assets/videos
GET    /api/van-assets/videos/:id
PUT    /api/van-assets/videos/:id
DELETE /api/van-assets/videos/:id
```

## การแก้ไขปัญหา

### Error 404
- ตรวจสอบว่า route ถูกเพิ่มใน server.js
- ตรวจสอบว่าไฟล์ vanAssets.js มีอยู่
- Deploy code ใหม่ไปยัง Heroku

### Database Error
- ตรวจสอบ database connection
- รัน SQL script สำหรับสร้างตาราง
- ตรวจสอบ environment variables

### Upload Error
- ตรวจสอบ Cloudinary credentials
- ตรวจสอบ file size limits
- ตรวจสอบ file format

## การตรวจสอบ Logs
```bash
# ดู Heroku logs
heroku logs --tail -a pbbackend-api-4e56bf125d15

# ดู logs เฉพาะ error
heroku logs --tail -a pbbackend-api-4e56bf125d15 | grep ERROR
```

## การ Rollback (ถ้าจำเป็น)
```bash
# ดู deployment history
heroku releases -a pbbackend-api-4e56bf125d15

# rollback ไป version ก่อนหน้า
heroku rollback vXX -a pbbackend-api-4e56bf125d15
```

## การทดสอบ Frontend
หลัง deploy สำเร็จ:
1. เปิด Admin Dashboard
2. ไปที่ "Van Assets" section
3. ทดสอบอัพโหลดภาพและวิดีโอ
4. ทดสอบการแก้ไขและลบ

## หมายเหตุ
- ต้อง deploy backend ก่อน frontend จะใช้งานได้
- ตรวจสอบ CORS settings ถ้ามีปัญหา
- ตรวจสอบ file upload limits ใน Heroku 