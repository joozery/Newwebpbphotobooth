# Notification System - คู่มือการใช้งาน

## ภาพรวม
ระบบได้เพิ่ม notification system สำหรับแสดงข้อความแจ้งเตือนเมื่อมีการเพิ่ม, แก้ไข, ลบ, และเปลี่ยนสถานะสินค้า

## ฟีเจอร์

### 1. ประเภทของ Notification
- **Success** (สีเขียว) - การดำเนินการสำเร็จ
- **Error** (สีแดง) - เกิดข้อผิดพลาด
- **Warning** (สีเหลือง) - คำเตือน
- **Info** (สีน้ำเงิน) - ข้อมูลทั่วไป

### 2. การแสดงผล
- แสดงที่มุมขวาบนของหน้าจอ
- มี animation slide-in จากขวา
- หายไปอัตโนมัติหลัง 4 วินาที
- สามารถปิดได้ด้วยการคลิกปุ่ม X

## การใช้งาน

### 1. Notification Component
```javascript
import Notification from '../ui/Notification';

// ใช้ใน component
<Notification
  type="success"
  message="เพิ่มสินค้าสำเร็จ!"
  isVisible={true}
  onClose={() => setNotification({ isVisible: false })}
  duration={4000}
/>
```

### 2. ฟังก์ชันแสดง Notification
```javascript
const [notification, setNotification] = useState({
  isVisible: false,
  type: 'success',
  message: ''
});

const showNotification = (type, message) => {
  setNotification({
    isVisible: true,
    type,
    message
  });
};

const hideNotification = () => {
  setNotification(prev => ({
    ...prev,
    isVisible: false
  }));
};
```

## การใช้งานใน AdminProducts

### 1. เพิ่มสินค้าใหม่
```javascript
// สำเร็จ
showNotification('success', 'เพิ่มสินค้าสำเร็จ!');

// ทำงานแบบ Offline
showNotification('success', 'เพิ่มสินค้าสำเร็จ! (ทำงานแบบ Offline)');

// เกิดข้อผิดพลาด
showNotification('error', 'เกิดข้อผิดพลาดในการเพิ่มสินค้า: ' + errorMessage);
```

### 2. แก้ไขสินค้า
```javascript
// สำเร็จ
showNotification('success', 'อัพเดทสินค้าสำเร็จ!');

// ทำงานแบบ Offline
showNotification('success', 'อัพเดทสินค้าสำเร็จ! (ทำงานแบบ Offline)');

// เกิดข้อผิดพลาด
showNotification('error', 'เกิดข้อผิดพลาดในการอัพเดทสินค้า: ' + errorMessage);
```

### 3. ลบสินค้า
```javascript
// สำเร็จ
showNotification('success', 'ลบสินค้าสำเร็จ!');

// ทำงานแบบ Offline
showNotification('success', 'ลบสินค้าสำเร็จ! (ทำงานแบบ Offline)');

// เกิดข้อผิดพลาด
showNotification('error', 'เกิดข้อผิดพลาดในการลบสินค้า');
```

### 4. เปลี่ยนสถานะสินค้า
```javascript
// สำเร็จ
showNotification('success', 'เปลี่ยนสถานะสินค้าเป็น: เปิดใช้งาน');

// อัพเดทในเซิร์ฟเวอร์ไม่สำเร็จ
showNotification('warning', 'อัพเดทสถานะในเซิร์ฟเวอร์ไม่สำเร็จ (ใช้ข้อมูลในเครื่อง)');

// เกิดข้อผิดพลาด
showNotification('error', 'เกิดข้อผิดพลาดในการเปลี่ยนสถานะ');
```

### 5. การค้นหา
```javascript
// ไม่พบสินค้า
showNotification('info', 'ไม่พบสินค้าที่ตรงกับคำค้นหา: "คำค้นหา"');
```

## CSS Animations

### 1. Slide In Animation
```css
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
```

### 2. Slide Out Animation
```css
@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-slide-out {
  animation: slideOut 0.3s ease-in;
}
```

## การปรับแต่ง

### 1. เปลี่ยนตำแหน่ง
```javascript
// เปลี่ยนจาก top-4 right-4 เป็นตำแหน่งอื่น
<div className="fixed top-4 right-4 z-50 animate-slide-in">
```

### 2. เปลี่ยนระยะเวลาแสดงผล
```javascript
// เปลี่ยนจาก 4000ms เป็นเวลาอื่น
<Notification
  duration={5000} // 5 วินาที
/>
```

### 3. เปลี่ยนสี
```javascript
// ปรับแต่งสีใน getBgColor() และ getTextColor()
const getBgColor = () => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200';
    // ...
  }
};
```

### 4. เปลี่ยนไอคอน
```javascript
// ปรับแต่งไอคอนใน getIcon()
const getIcon = () => {
  switch (type) {
    case 'success':
      return <HiCheckCircle className="w-5 h-5 text-green-500" />;
    // ...
  }
};
```

## การทดสอบ

### 1. ทดสอบการเพิ่มสินค้า
1. เปิดหน้า Products/Services
2. คลิก "เพิ่มสินค้าใหม่"
3. กรอกข้อมูลและบันทึก
4. ตรวจสอบ notification ที่มุมขวาบน

### 2. ทดสอบการลบสินค้า
1. คลิกปุ่มลบในสินค้าใดสินค้าหนึ่ง
2. ยืนยันการลบ
3. ตรวจสอบ notification

### 3. ทดสอบการเปลี่ยนสถานะ
1. คลิกปุ่ม "ซ่อน" หรือ "แสดง"
2. ตรวจสอบ notification

### 4. ทดสอบการค้นหา
1. พิมพ์คำค้นหาที่ไม่มีในระบบ
2. ตรวจสอบ notification แจ้งว่าไม่พบสินค้า

## Best Practices

### 1. การใช้ประเภท Notification
- **Success**: การดำเนินการสำเร็จ
- **Error**: ข้อผิดพลาดที่ผู้ใช้ต้องแก้ไข
- **Warning**: คำเตือนที่ผู้ใช้ควรทราบ
- **Info**: ข้อมูลทั่วไปที่ให้ความรู้

### 2. ข้อความ
- ใช้ข้อความที่ชัดเจนและเข้าใจง่าย
- ระบุการดำเนินการที่ทำ
- แสดงข้อผิดพลาดที่เฉพาะเจาะจง

### 3. ระยะเวลาแสดงผล
- Success: 3-4 วินาที
- Error: 5-6 วินาที (ให้เวลาอ่านข้อผิดพลาด)
- Warning: 4-5 วินาที
- Info: 3-4 วินาที

### 4. การจัดการหลาย Notification
- ปิด notification เก่าก่อนแสดงใหม่
- ไม่แสดง notification ซ้ำกัน
- ใช้ queue system หากต้องการแสดงหลาย notification 