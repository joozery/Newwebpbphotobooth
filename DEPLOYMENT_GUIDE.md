# 🚀 Deployment Guide - PB PhotoBooth

## Backend (Heroku) ✅

### ✅ Already Deployed
- **URL**: https://pbbackend-api-4e56bf125d15.herokuapp.com
- **Status**: ✅ Active

### Environment Variables ที่ต้องตั้งค่าใน Heroku:

```bash
# Database Configuration
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
DB_PORT=3306

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
NODE_ENV=production
PORT=5000

# CORS Configuration
CORS_ORIGIN=https://pbphotobooth.netlify.app
```

### ตั้งค่า Environment Variables ใน Heroku:

```bash
# เข้าไปที่ Heroku Dashboard
# หรือใช้ Heroku CLI
heroku config:set DB_HOST=your_db_host --app pbbackend-api-4e56bf125d15
heroku config:set DB_USER=your_db_user --app pbbackend-api-4e56bf125d15
heroku config:set DB_PASSWORD=your_db_password --app pbbackend-api-4e56bf125d15
heroku config:set DB_NAME=your_db_name --app pbbackend-api-4e56bf125d15
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name --app pbbackend-api-4e56bf125d15
heroku config:set CLOUDINARY_API_KEY=your_cloudinary_key --app pbbackend-api-4e56bf125d15
heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_secret --app pbbackend-api-4e56bf125d15
heroku config:set NODE_ENV=production --app pbbackend-api-4e56bf125d15
heroku config:set CORS_ORIGIN=https://pbphotobooth.netlify.app --app pbbackend-api-4e56bf125d15
```

## Frontend (Netlify/Vercel)

### Environment Variables สำหรับ Frontend:

สร้างไฟล์ `.env.production` ใน frontend folder:

```env
# Production Environment Variables
VITE_API_URL=https://pbbackend-api-4e56bf125d15.herokuapp.com/api
VITE_API_BASE_URL=https://pbbackend-api-4e56bf125d15.herokuapp.com

# App Configuration
VITE_APP_TITLE=PB PhotoBooth
VITE_APP_DESCRIPTION=บริการถ่ายภาพงานแต่งและอีเว้นท์
VITE_APP_URL=https://pbphotobooth.netlify.app
```

### Deploy to Netlify:

1. **Build Command:**
   ```bash
   npm run build
   ```

2. **Publish Directory:**
   ```
   dist
   ```

3. **Environment Variables ใน Netlify:**
   - `VITE_API_URL` = `https://pbbackend-api-4e56bf125d15.herokuapp.com/api`
   - `VITE_API_BASE_URL` = `https://pbbackend-api-4e56bf125d15.herokuapp.com`

### Deploy to Vercel:

1. **Build Command:**
   ```bash
   npm run build
   ```

2. **Output Directory:**
   ```
   dist
   ```

3. **Environment Variables ใน Vercel:**
   - `VITE_API_URL` = `https://pbbackend-api-4e56bf125d15.herokuapp.com/api`
   - `VITE_API_BASE_URL` = `https://pbbackend-api-4e56bf125d15.herokuapp.com`

## 🔧 การตรวจสอบ

### 1. ตรวจสอบ Backend API:

```bash
# Health Check
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/health

# Test Hero Slides API
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/hero-slides

# Test Products API
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/products
```

### 2. ตรวจสอบ Frontend:

```bash
# Build และ test locally
cd frontend
npm run build
npm run preview
```

### 3. ตรวจสอบ Admin Panel:

- ไปที่: `https://your-frontend-domain.com/admin`
- ทดสอบการอัพโหลดรูปภาพ
- ทดสอบการจัดการ Hero Slides

## 🐛 การแก้ไขปัญหา

### H27 Timeout Errors:
- ✅ Backend มี timeout 30 วินาทีแล้ว
- ✅ Database connection pooling ถูกตั้งค่าแล้ว
- ✅ Request/Response interceptors สำหรับ logging

### CORS Issues:
- ✅ Backend มี CORS configuration แล้ว
- ✅ ตั้งค่า `CORS_ORIGIN` ให้ตรงกับ frontend domain

### Database Connection:
- ✅ Connection pooling
- ✅ Timeout configuration
- ✅ Error handling

## 📊 Monitoring

### Heroku Logs:
```bash
heroku logs --tail --app pbbackend-api-4e56bf125d15
```

### API Endpoints ที่พร้อมใช้งาน:

- `GET /health` - Health check
- `GET /api/hero-slides` - Get all hero slides
- `GET /api/hero-slides/active` - Get active hero slides
- `POST /api/hero-slides` - Create new hero slide (with image upload)
- `PUT /api/hero-slides/:id` - Update hero slide (with image upload)
- `DELETE /api/hero-slides/:id` - Delete hero slide
- `PUT /api/hero-slides/:id/order` - Update slide order
- `PUT /api/hero-slides/:id/toggle-status` - Toggle slide status

## 🚀 Next Steps

1. **ตั้งค่า Environment Variables** ใน Heroku
2. **Deploy Frontend** ไปยัง Netlify/Vercel
3. **ทดสอบระบบ** ทั้งหมด
4. **ตั้งค่า Domain** (ถ้าต้องการ)
5. **ตั้งค่า SSL** (อัตโนมัติใน Heroku/Netlify)

## 📞 Support

หากมีปัญหา:
- ตรวจสอบ Heroku logs
- ตรวจสอบ Environment Variables
- ตรวจสอบ Database connection
- ตรวจสอบ CORS configuration 