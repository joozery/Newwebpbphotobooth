import React, { useState } from 'react';
import aiphotoImg from '../assets/slidehero/Ai2.png';
import video360Img from '../assets/slidehero/pb2.png';
import photoboothImg from '../assets/slidehero/pb.png';
import blessImg from '../assets/slidehero/PBMemory.png';

// รูป Photobooth Box B1-B4
import B1Img from '../assets/slidehero/B1.png';
import B2Img from '../assets/slidehero/B2.png';
import B3Img from '../assets/slidehero/B3.png';
import B4Img from '../assets/slidehero/B4.png';

// รูปสินค้าเพิ่มเติม
import aumongImg from '../assets/slidehero/aumong.png';
import miniaiImg from '../assets/slidehero/miniai.png';

// ข้อมูลรายละเอียดสินค้า
const productDetails = {
  'PhotoBooth': {
    title: 'PhotoBooth',
    description: 'งานแต่งงาน งานสมัชชา และงานกิจกรรมต่างๆ',
    features: [
      'ถ่ายรูปและปริ้นท์ขนาด 2x6" และ 4x6" ไม่จำกัดจำนวน',
      'รับไฟล์ภาพทันทีทาง Airdrop หรือ QR Code',
      'กล้อง Mirrorless ภาพคมชัด HD',
      'จอทัชสกรีน Live view แบบ Realtime',
      'ฟรีค่าออกแบบกรอบรูปตามธีม',
      'อุปกรณ์ Props ให้เลือกมากมาย'
    ],
    price: 'เริ่มต้น 15,000 บาท',
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'PB Memory': {
    title: 'PB Memory',
    description: 'ตู้ปิดคำภาพเพื่อของขวัญ แถม AI ด้วย',
    features: [
      'ส่งคำอวยพรออนไลน์ให้กับคู่บ่าวสาว',
      'ไม่อยู่ในงานก็ส่งได้',
      'ภาพสำเร็จทันที พร้อมพิมพ์',
      'งาน Meet and Greet ก็เก็บได้',
      'ระบบ AI สร้างภาพที่น่าประทับใจ',
      'แอพพลิเคชั่นใช้งานง่าย'
    ],
    price: 'เริ่มต้น 8,000 บาท',
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  '360 Video Booth': {
    title: '360 Video Booth',
    description: 'เวทีหมุน 360 องศา ถ่ายรูปและวิดีโอ เจ๋งมาก',
    features: [
      'เวทีหมุน 360 องศาอัตโนมัติ',
      'ถ่ายวิดีโอ Slow Motion คุณภาพ HD',
      'ระบบแสงไฟ LED เอฟเฟกต์สวยงาม',
      'พื้นที่รองรับ 3-6 คน',
      'รับไฟล์ทันทีผ่าน QR Code',
      'ทีมงานมืออาชีพควบคุมตลอดงาน'
    ],
    price: 'เริ่มต้น 25,000 บาท',
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'AI Photobooth': {
    title: 'AI Photobooth',
    description: 'ระบบ AI จากระดับมืออาชีพ ล้ำสมัยระดับโลก',
    features: [
      'ระบบ AI สร้างภาพแบบ Real-time',
      'เทคโนโลยีการประมวลผลภาพล้ำสมัย',
      'สร้างภาพสไตล์ต่างๆ หลากหลาย',
      'คุณภาพภาพระดับมืออาชีพ',
      'ใช้งานง่าย เพียงแค่ยืนถ่ายรูป',
      'ไฟล์ภาพส่งทันทีผ่านระบบออนไลน์'
    ],
    price: 'เริ่มต้น 20,000 บาท',
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  }
  // เพิ่มรายละเอียดสินค้าอื่นๆ ได้ตามต้องการ
};

function ProductCard({ img, title, desc }) {
  const handleViewDetails = () => {
    // สร้าง URL-friendly slug
    const slug = title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-ก-๙]/g, '');
    
    // เปิดหน้าใหม่ในแท็บเดียวกัน
    window.location.href = `/product/${slug}`;
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-2xl transition flex flex-col border">
      <img src={img} alt={title} className="w-full h-40 object-contain bg-white rounded-t-xl" />
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="font-semibold text-lg mb-1 text-black">{title}</div>
        <div className="text-black text-sm text-center mb-4">{desc}</div>
        <button 
          onClick={handleViewDetails}
          className="mt-auto text-blue-500 underline bg-blue-50 rounded px-4 py-1 font-medium transition hover:bg-blue-100"
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
}



const ProductSection = () => {
  return (
    <section id="portfolio" className="w-full py-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">รวมสินค้าและบริการ</h2>
            <p className="text-black text-sm mt-1">ค้นหาสินค้าและบริการถ่ายภาพงานแต่งที่เหมาะกับคุณ</p>
          </div>
          <button className="border border-gray-300 rounded px-4 py-1 text-black hover:bg-gray-100 transition">ดูทั้งหมด</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* แถวที่ 1 */}
          <ProductCard img={photoboothImg} title="PhotoBooth" desc="งานแต่งงาน งานสมัชชา และงานกิจกรรมต่างๆ" />
          <ProductCard img={blessImg} title="PB Memory" desc="ตู้ปิดคำภาพเพื่อของขวัญ แถม AI ด้วย" />
          <ProductCard img={video360Img} title="360 Video Booth" desc="เวทีหมุน 360 องศา ถ่ายรูปและวิดีโอ เจ๋งมาก" />
          <ProductCard img={B1Img} title="Photobooth Box B1" desc="Photo ไฟฟ้า เสีย ส่ายไปคาสิโน่ ลูกโป่งแด่งฟ้องฟุ้งกาลเวลา" />
          <ProductCard img={B2Img} title="Photobooth Box B2" desc="Photo ไฟฟ้าเจ้าระเบียง สวยงามในรูปแบบคลาสสิค" />
          
          {/* แถวที่ 2 */}
          <ProductCard img={B3Img} title="Photobooth Box B3" desc="Photo ไฟฟ้าเจ้าระเบียง แบบมินิมอลไม่แปลมใส" />
          <ProductCard img={B4Img} title="Photobooth Box B4" desc="Photo Cocktal with ดีไซน์ทันสมัยและหรูหรา" />
          <ProductCard img={miniaiImg} title="AI mini studio" desc="Photo ไฟฟ้า Gen Ai งานแต่งงานสุดล้ำ" />
          <ProductCard img={aumongImg} title="อุโมงค์" desc="จากลิงพร้อมไฟ RGB กับใหม่ด้วยโจทย์ ของอุโมงค์ 3x4 เมตร" />
          <ProductCard img={aiphotoImg} title="AI Photobooth" desc="ระบบ AI จากระดับมืออาชีพ ล้ำสมัยระดับโลก" />
        </div>
      </div>
    </section>
  );
};

export default ProductSection; 