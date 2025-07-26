# 🔧 คู่มือการแก้ไขปัญหา Clients API

## 🚨 ปัญหาที่พบ
Error 500 เมื่อเรียก POST `/api/clients` บน Heroku

## 🔍 สาเหตุที่เป็นไปได้
1. **Database table ไม่มีอยู่** - ตาราง `clients` ยังไม่ได้สร้าง
2. **Cloudinary configuration** - Environment variables ไม่ถูกต้อง
3. **Database connection** - การเชื่อมต่อฐานข้อมูลมีปัญหา

## 🛠️ วิธีแก้ไข

### 1. รัน Database Migration

#### วิธีที่ 1: ใช้ Heroku CLI
```bash
# เข้าไปใน Heroku bash
heroku run bash -a pbbackend-api-4e56bf125d15

# รัน migration script
npm run migrate:clients
```

#### วิธีที่ 2: ใช้ Heroku Postgres
```bash
# เชื่อมต่อ database โดยตรง
heroku pg:psql -a pbbackend-api-4e56bf125d15

# รัน SQL commands
\i backend/database/migrate_clients.sql
```

#### วิธีที่ 3: ใช้ Heroku Dashboard
1. ไปที่ [Heroku Dashboard](https://dashboard.heroku.com/apps/pbbackend-api-4e56bf125d15)
2. ไปที่ Resources tab
3. คลิกที่ Postgres addon
4. ไปที่ Settings tab
5. คลิก "View Credentials"
6. ใช้ credentials เชื่อมต่อ database และรัน SQL

### 2. ตรวจสอบ Environment Variables

ตรวจสอบว่า environment variables เหล่านี้ถูกตั้งค่าใน Heroku:

```bash
# ตรวจสอบ environment variables
heroku config -a pbbackend-api-4e56bf125d15

# ตั้งค่า Cloudinary variables (ถ้ายังไม่มี)
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name -a pbbackend-api-4e56bf125d15
heroku config:set CLOUDINARY_API_KEY=your_api_key -a pbbackend-api-4e56bf125d15
heroku config:set CLOUDINARY_API_SECRET=your_api_secret -a pbbackend-api-4e56bf125d15

# ตรวจสอบ Database URL
heroku config:get DATABASE_URL -a pbbackend-api-4e56bf125d15
```

### 3. ตรวจสอบ Logs

```bash
# ดู logs แบบ real-time
heroku logs --tail -a pbbackend-api-4e56bf125d15

# ดู logs เฉพาะ error
heroku logs --tail -a pbbackend-api-4e56bf125d15 | grep -i error
```

## 📋 SQL Migration Script

ถ้าต้องการรัน SQL โดยตรง:

```sql
-- สร้างตาราง clients
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  alt_text VARCHAR(500),
  client_order INT DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- สร้าง indexes
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients(client_order);
CREATE INDEX IF NOT EXISTS idx_clients_created ON clients(created_at);

-- เพิ่มข้อมูลตัวอย่าง
INSERT IGNORE INTO clients (name, logo_url, alt_text, client_order, status) VALUES
('Sample Client 1', 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Client+1', 'Sample Client 1 Logo', 1, 'active'),
('Sample Client 2', 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Client+2', 'Sample Client 2 Logo', 2, 'active'),
('Sample Client 3', 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Client+3', 'Sample Client 3 Logo', 3, 'active'),
('Sample Client 4', 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Client+4', 'Sample Client 4 Logo', 4, 'active'),
('Sample Client 5', 'https://via.placeholder.com/300x200/D97706/FFFFFF?text=Client+5', 'Sample Client 5 Logo', 5, 'active');
```

## 🧪 การทดสอบ

### 1. ทดสอบ API Endpoints

```bash
# ทดสอบ GET /api/clients
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/clients

# ทดสอบ GET /api/clients/active
curl https://pbbackend-api-4e56bf125d15.herokuapp.com/api/clients/active
```

### 2. ทดสอบ Frontend

1. ไปที่ Admin Dashboard
2. คลิกเมนู "ลูกค้า"
3. ทดสอบอัพโหลดโลโก้
4. ตรวจสอบว่าแสดงผลในหน้า Our Clients

## 📞 การขอความช่วยเหลือ

ถ้ายังมีปัญหา ให้ส่งข้อมูลต่อไปนี้:

1. **Error logs** จาก Heroku
2. **Environment variables** (ไม่รวม secrets)
3. **Database structure** (ผลลัพธ์จาก `DESCRIBE clients;`)
4. **API response** ที่ได้รับ

## ✅ Checklist

- [ ] Database table `clients` ถูกสร้างแล้ว
- [ ] Environment variables ถูกตั้งค่าแล้ว
- [ ] Cloudinary configuration ทำงานได้
- [ ] API endpoints ทำงานได้
- [ ] Frontend สามารถเชื่อมต่อได้
- [ ] การอัพโหลดรูปภาพทำงานได้
- [ ] การแสดงผลในหน้า Our Clients ทำงานได้ 