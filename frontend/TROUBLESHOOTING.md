# 🔧 คู่มือแก้ปัญหา AdminProducts

## ปัญหา: ข้อมูลไม่มาในหน้า AdminProducts

### 1. ตรวจสอบ Console Logs
เปิด Developer Tools (F12) และดูที่ Console tab เพื่อดู error messages

### 2. สาเหตุที่เป็นไปได้:

#### A. Backend API ไม่ทำงาน
- ตรวจสอบว่า Heroku backend ยังทำงานอยู่หรือไม่
- URL: https://pbbackend-api-4e56bf125d15.herokuapp.com

#### B. CORS Issues
- Backend อาจจะไม่ได้ตั้งค่า CORS ให้ frontend เข้าถึงได้

#### C. Network Issues
- การเชื่อมต่ออินเทอร์เน็ต
- Firewall หรือ Proxy

#### D. API Endpoint ไม่ถูกต้อง
- ลองเปลี่ยน endpoint จาก `/api/products` เป็น `/products`

### 3. วิธีแก้ไข:

#### ขั้นตอนที่ 1: ตรวจสอบ Backend
```bash
# ทดสอบ API ด้วย curl
curl -X GET https://pbbackend-api-4e56bf125d15.herokuapp.com/api/products
```

#### ขั้นตอนที่ 2: สร้างไฟล์ .env.local
สร้างไฟล์ `.env.local` ในโฟลเดอร์ `frontend/`:
```
VITE_API_BASE_URL=https://pbbackend-api-4e56bf125d15.herokuapp.com
```

#### ขั้นตอนที่ 3: รีสตาร์ท Development Server
```bash
cd frontend
npm run dev
```

### 4. ข้อมูลตัวอย่าง
หาก API ไม่ทำงาน ระบบจะแสดงข้อมูลตัวอย่าง 3 รายการ:
- PhotoBooth พรีเมียม
- Video Booth 360°
- AI Photo Enhancement

### 5. Debug Information
โค้ดได้เพิ่ม console logs เพื่อ debug:
- 🚀 API Request logs
- ✅ Success logs  
- ❌ Error logs
- 🔄 Progress logs

### 6. การทดสอบ Offline Mode
หาก API ไม่ทำงาน ระบบจะ:
1. แสดงข้อมูลตัวอย่าง
2. แสดง notification warning
3. ยังคงสามารถเพิ่ม/แก้ไข/ลบสินค้าได้ (ใน local state)

### 7. ตรวจสอบ Network Tab
ใน Developer Tools > Network tab:
- ดูว่า request ไปที่ URL ไหน
- ดู response status code
- ดู response data

### 8. ลองใช้ Local Backend
หากมี local backend:
1. เปลี่ยน VITE_API_BASE_URL เป็น http://localhost:3001
2. รัน local backend
3. รีสตาร์ท frontend

### 9. ตรวจสอบ Package Dependencies
```bash
cd frontend
npm install
```

### 10. Clear Cache
```bash
# Clear browser cache
# หรือ
npm run build
npm run dev
```

## ส่งข้อความแจ้งปัญหา
หากยังแก้ไม่ได้ กรุณาส่ง:
1. Console logs จาก Developer Tools
2. Network tab screenshots
3. Error messages ที่แสดง 