# หน้า Products/Services - คู่มือการใช้งานกับ Backend API

## ภาพรวม
หน้า Products/Services เชื่อมต่อกับ backend API ที่ใช้ MySQL database และมีโครงสร้างข้อมูลที่ซับซ้อน

## Backend API Structure

### Database Tables
- `products` - ข้อมูลสินค้าหลัก
- `product_features` - คุณสมบัติสินค้า
- `product_technical_specs` - ข้อมูลทางเทคนิค
- `product_detail_images` - รูปภาพรายละเอียด

### API Endpoints
- `GET /api/products` - ดึงสินค้าทั้งหมด
- `GET /api/products/:id` - ดึงสินค้าตาม ID
- `POST /api/products` - เพิ่มสินค้าใหม่
- `PUT /api/products/:id` - อัพเดทสินค้า
- `DELETE /api/products/:id` - ลบสินค้า

## การทำงานของ Frontend

### 1. การดึงข้อมูล (Fetch Products)
```javascript
// API จะส่งข้อมูลในรูปแบบ:
{
  id: 1,
  title: "PhotoBooth Premium",
  description: "บริการ PhotoBooth แบบพรีเมียม",
  price: "15,000",
  price_details: "ครึ่งวันงาน (4 ชั่วโมง) 15,000 บาท",
  category: "PhotoBooth",
  status: "active",
  features: ["ถ่ายภาพคุณภาพสูง", "พิมพ์ภาพทันที"],
  technical_specs: ["กล้อง DSLR", "เครื่องพิมพ์ 6x4"],
  detail_images: ["/uploads/detail1.jpg", "/uploads/detail2.jpg"],
  main_image_url: "/uploads/photobooth.jpg",
  created_at: "2024-01-01T00:00:00.000Z",
  updated_at: "2024-01-01T00:00:00.000Z"
}
```

### 2. การเพิ่มสินค้าใหม่
```javascript
// ส่งข้อมูลไป API:
{
  title: "ชื่อสินค้า",
  description: "คำอธิบาย",
  price: "15,000",
  priceDetails: "รายละเอียดราคา",
  category: "PhotoBooth",
  status: "active",
  features: ["คุณสมบัติ 1", "คุณสมบัติ 2"],
  technicalSpecs: ["ข้อมูลทางเทคนิค 1", "ข้อมูลทางเทคนิค 2"],
  mainImage: "/uploads/image.jpg",
  detailImages: ["/uploads/detail1.jpg", "/uploads/detail2.jpg"]
}
```

### 3. การอัพเดทสินค้า
```javascript
// ส่งข้อมูลไป API (เหมือนการเพิ่มสินค้าใหม่)
PUT /api/products/:id
```

## การจัดการข้อมูล

### Features และ Technical Specs
- ข้อมูลจะถูกเก็บในตารางแยก
- ใช้ `GROUP_CONCAT` เพื่อรวมข้อมูลเป็น string
- แยกด้วย `||` และแปลงกลับเป็น array ใน frontend

### รูปภาพ
- รูปภาพหลัก: `main_image_url` ในตาราง products
- รูปภาพรายละเอียด: ตาราง `product_detail_images`
- รองรับการอัพโหลดหลายไฟล์

### Transaction Handling
- ใช้ MySQL transactions สำหรับการเพิ่ม/อัพเดท/ลบ
- หากเกิดข้อผิดพลาดจะ rollback ทั้งหมด

## Error Handling

### Network Errors
- ถ้า API ไม่สามารถเชื่อมต่อได้ ระบบจะทำงานแบบ offline
- ข้อมูลจะถูกเก็บใน local state
- แสดงข้อความ "(ทำงานแบบ Offline)"

### API Errors
- แสดงข้อความ error จาก backend
- จัดการ HTTP status codes (404, 500, etc.)

## การตั้งค่า

### Environment Variables
```env
VITE_API_BASE_URL=https://pbbackend-api-4e56bf125d15.herokuapp.com
```

### API Configuration
```javascript
// src/services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
```

## การแก้ไขปัญหา

### ปัญหา: ไม่สามารถดึงข้อมูลสินค้าได้
1. ตรวจสอบ URL ของ API
2. ตรวจสอบการเชื่อมต่อ database
3. ตรวจสอบ console errors
4. ระบบจะทำงานแบบ offline โดยอัตโนมัติ

### ปัญหา: ไม่สามารถเพิ่มสินค้าได้
1. ตรวจสอบข้อมูลที่ส่งไป API
2. ตรวจสอบ database constraints
3. ตรวจสอบ transaction errors
4. ดู error message จาก backend

### ปัญหา: รูปภาพไม่แสดง
1. ตรวจสอบ path ของรูปภาพ
2. ตรวจสอบการอัพโหลดไฟล์
3. ตรวจสอบ file permissions

## การทดสอบ API

### ใช้ curl
```bash
# ดึงสินค้าทั้งหมด
curl -X GET https://pbbackend-api-4e56bf125d15.herokuapp.com/api/products

# เพิ่มสินค้าใหม่
curl -X POST https://pbbackend-api-4e56bf125d15.herokuapp.com/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "Test Description",
    "price": "10,000",
    "category": "PhotoBooth",
    "status": "active",
    "features": ["Feature 1", "Feature 2"],
    "technicalSpecs": ["Spec 1", "Spec 2"]
  }'
```

### ใช้ Postman
1. Import collection
2. ตั้งค่า environment variables
3. ทดสอบแต่ละ endpoint

## การพัฒนา

### Local Development
1. ตั้งค่า `VITE_API_BASE_URL=http://localhost:3000`
2. รัน backend server
3. รัน frontend development server

### Production Deployment
1. ตั้งค่า `VITE_API_BASE_URL=https://your-production-api.com`
2. Build frontend: `npm run build`
3. Deploy to hosting service 