# Quick Fix: 404 Error on Van Assets Endpoints

## ปัญหา
```
2025-07-26T15:53:45.310643+00:00 heroku[router]: at=info method=POST path="/van-assets/upload-video" host=pbbackend-api-4e56bf125d15.herokuapp.com request_id=e877e802-38f4-e591-4508-91a98d886467 fwd="184.82.104.239" dyno=web.1 connect=0ms service=2433ms status=404 bytes=163 protocol=http1.1 tls=true tls_version=unknown
```

## สาเหตุ
Heroku deployment ยังไม่ได้อัพเดท code ใหม่ที่มี van assets routes

## วิธีแก้ไขด่วน

### 1. ตรวจสอบ Local Development
```bash
cd backend
npm start
```

ทดสอบ API:
```bash
curl -X GET http://localhost:5000/api/van-assets/images
curl -X GET http://localhost:5000/api/van-assets/videos
```

### 2. Deploy to Heroku (วิธีเร็วที่สุด)

#### ใช้ Heroku CLI:
```bash
cd backend
heroku login
heroku git:remote -a pbbackend-api-4e56bf125d15
git add .
git commit -m "Fix: Add van assets routes"
git push heroku main
```

#### หรือใช้ Heroku Dashboard:
1. ไปที่ https://dashboard.heroku.com/apps/pbbackend-api-4e56bf125d15
2. ไปที่ Deploy tab
3. เลือก "Deploy Branch" หรือ "Manual Deploy"

### 3. ตรวจสอบ Deployment
```bash
# ดู logs
heroku logs --tail -a pbbackend-api-4e56bf125d15

# ทดสอบ API
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/health
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/images
```

### 4. ตั้งค่า Database (ถ้าจำเป็น)
```bash
# รัน setup script
cd backend
npm run setup:van-assets
```

## การตรวจสอบ

### ตรวจสอบ Routes
```bash
# ตรวจสอบว่า route ถูกเพิ่มใน server.js
grep -n "van-assets" backend/server.js
```

### ตรวจสอบไฟล์
```bash
# ตรวจสอบว่าไฟล์มีอยู่
ls -la backend/routes/vanAssets.js
```

### ตรวจสอบ Heroku
```bash
# ตรวจสอบ Heroku app
heroku info -a pbbackend-api-4e56bf125d15

# ตรวจสอบ environment variables
heroku config -a pbbackend-api-4e56bf125d15
```

## ถ้ายังไม่ได้

### 1. Restart Heroku App
```bash
heroku restart -a pbbackend-api-4e56bf125d15
```

### 2. ตรวจสอบ Build Logs
```bash
heroku logs --tail -a pbbackend-api-4e56bf125d15
```

### 3. ตรวจสอบ Dependencies
ตรวจสอบว่า `package.json` มี dependencies ที่จำเป็น:
- express
- multer
- cloudinary
- mysql2

### 4. ตรวจสอบ Environment Variables
```bash
heroku config:get DB_HOST -a pbbackend-api-4e56bf125d15
heroku config:get CLOUDINARY_CLOUD_NAME -a pbbackend-api-4e56bf125d15
```

## การทดสอบหลัง Fix

### 1. ทดสอบ API Endpoints
```bash
# Health check
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/health

# Van assets endpoints
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/images
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/van-assets/videos
```

### 2. ทดสอบ Frontend
1. เปิด Admin Dashboard
2. ไปที่ "Van Assets"
3. ทดสอบอัพโหลดไฟล์

## หมายเหตุ
- ต้อง deploy backend ก่อน frontend จะใช้งานได้
- ตรวจสอบ CORS settings ถ้ามีปัญหา
- ตรวจสอบ file upload limits ใน Heroku

## Support
หากยังมีปัญหา ให้ตรวจสอบ:
1. Heroku logs
2. Database connection
3. Environment variables
4. File permissions 