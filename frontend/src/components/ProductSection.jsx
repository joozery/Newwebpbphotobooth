import React, { useState } from 'react';
import { FaTimes, FaPhone, FaLine, FaInfoCircle, FaCalendarAlt, FaComments } from 'react-icons/fa';
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
    image: photoboothImg,
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
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 15,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 25,000 บาท',
      'รวมทีมงาน 2 คน',
      'รวมค่าเดินทางใน กทม.'
    ],
    specifications: [
      'กล้อง Sony Mirrorless',
      'เครื่องปริ้นท์ Canon Selphy',
      'จอ Touchscreen 21 นิ้ว',
      'ระบบแสงไฟ LED Professional'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'PB Memory': {
    title: 'PB Memory',
    image: blessImg,
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
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 8,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 12,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 200 แผ่น'
    ],
    specifications: [
      'ระบบ AI Image Generation',
      'Tablet Android 10 นิ้ว',
      'เครื่องปริ้นท์ความร้อน',
      'ระบบ WiFi และ QR Code'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  '360 Video Booth': {
    title: '360 Video Booth',
    image: video360Img,
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
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 25,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 35,000 บาท',
      'รวมทีมงาน 2 คน',
      'รวมอุปกรณ์ครบชุด'
    ],
    specifications: [
      'เวทีหมุนขนาด 120 cm',
      'กล้อง 4K Video Recording',
      'ระบบแสงไฟ RGB LED Ring',
      'มอเตอร์ควบคุมความเร็ว'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'Photobooth Box B1': {
    title: 'Photobooth Box B1',
    image: B1Img,
    description: 'บูธถ่ายรูปขนาดเล็ก เหมาะสำหรับงานขนาดเล็ก',
    features: [
      'ขนาดกะทัดรัด พกพาง่าย',
      'ถ่ายรูปและปริ้นท์ทันที',
      'จอทัชสกรีน 15 นิ้ว',
      'ระบบแสงไฟ LED ในตัว',
      'รองรับการเชื่อมต่อ WiFi',
      'แบตเตอรี่สำรอง 4 ชั่วโมง'
    ],
    price: 'เริ่มต้น 8,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 8,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 12,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 100 แผ่น'
    ],
    specifications: [
      'ขนาด 60x60x180 cm',
      'กล้อง 12MP',
      'เครื่องปริ้นท์ความร้อน',
      'น้ำหนัก 15 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'Photobooth Box B2': {
    title: 'Photobooth Box B2',
    image: B2Img,
    description: 'บูธถ่ายรูปขนาดกลาง เหมาะสำหรับงานทั่วไป',
    features: [
      'ขนาดกลาง เหมาะกับงานทั่วไป',
      'ถ่ายรูปและปริ้นท์คุณภาพสูง',
      'จอทัชสกรีน 18 นิ้ว',
      'ระบบแสงไฟ LED Professional',
      'รองรับการเชื่อมต่อ Bluetooth',
      'แบตเตอรี่สำรอง 6 ชั่วโมง'
    ],
    price: 'เริ่มต้น 10,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 10,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 15,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 150 แผ่น'
    ],
    specifications: [
      'ขนาด 80x80x200 cm',
      'กล้อง 16MP',
      'เครื่องปริ้นท์ความร้อน',
      'น้ำหนัก 25 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'Photobooth Box B3': {
    title: 'Photobooth Box B3',
    image: B3Img,
    description: 'บูธถ่ายรูปขนาดใหญ่ เหมาะสำหรับงานใหญ่',
    features: [
      'ขนาดใหญ่ เหมาะกับงานใหญ่',
      'ถ่ายรูปและปริ้นท์คุณภาพสูงสุด',
      'จอทัชสกรีน 21 นิ้ว',
      'ระบบแสงไฟ LED Professional',
      'รองรับการเชื่อมต่อ WiFi และ Bluetooth',
      'แบตเตอรี่สำรอง 8 ชั่วโมง'
    ],
    price: 'เริ่มต้น 12,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 12,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 18,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 200 แผ่น'
    ],
    specifications: [
      'ขนาด 100x100x220 cm',
      'กล้อง 20MP',
      'เครื่องปริ้นท์ความร้อน',
      'น้ำหนัก 35 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'Photobooth Box B4': {
    title: 'Photobooth Box B4',
    image: B4Img,
    description: 'บูธถ่ายรูปพรีเมียม เหมาะสำหรับงานหรู',
    features: [
      'พรีเมียม เหมาะกับงานหรู',
      'ถ่ายรูปและปริ้นท์คุณภาพสูงสุด',
      'จอทัชสกรีน 24 นิ้ว',
      'ระบบแสงไฟ LED Professional',
      'รองรับการเชื่อมต่อ WiFi, Bluetooth และ NFC',
      'แบตเตอรี่สำรอง 10 ชั่วโมง'
    ],
    price: 'เริ่มต้น 15,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 15,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 22,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 250 แผ่น'
    ],
    specifications: [
      'ขนาด 120x120x240 cm',
      'กล้อง 24MP',
      'เครื่องปริ้นท์ความร้อน',
      'น้ำหนัก 45 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'AI Photobooth': {
    title: 'AI Photobooth',
    image: aiphotoImg,
    description: 'บูธถ่ายรูป AI สร้างภาพสุดล้ำ',
    features: [
      'ระบบ AI สร้างภาพสุดล้ำ',
      'ถ่ายรูปและสร้างภาพด้วย AI',
      'จอทัชสกรีน 21 นิ้ว',
      'ระบบแสงไฟ LED Professional',
      'รองรับการเชื่อมต่อ WiFi',
      'แบตเตอรี่สำรอง 6 ชั่วโมง'
    ],
    price: 'เริ่มต้น 20,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 20,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 30,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 150 แผ่น'
    ],
    specifications: [
      'ขนาด 100x100x220 cm',
      'กล้อง 20MP',
      'ระบบ AI Image Generation',
      'น้ำหนัก 40 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'Mini AI Photobooth': {
    title: 'Mini AI Photobooth',
    image: miniaiImg,
    description: 'บูธถ่ายรูป AI ขนาดเล็ก พกพาง่าย',
    features: [
      'ระบบ AI สร้างภาพสุดล้ำ',
      'ขนาดเล็ก พกพาง่าย',
      'จอทัชสกรีน 15 นิ้ว',
      'ระบบแสงไฟ LED ในตัว',
      'รองรับการเชื่อมต่อ WiFi',
      'แบตเตอรี่สำรอง 4 ชั่วโมง'
    ],
    price: 'เริ่มต้น 15,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 15,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 22,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 100 แผ่น'
    ],
    specifications: [
      'ขนาด 60x60x180 cm',
      'กล้อง 16MP',
      'ระบบ AI Image Generation',
      'น้ำหนัก 20 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  },
  'Au Mong': {
    title: 'Au Mong',
    image: aumongImg,
    description: 'บูธถ่ายรูปออโต้ เหมาะสำหรับงานอีเว้นท์',
    features: [
      'ระบบออโต้ เหมาะกับงานอีเว้นท์',
      'ถ่ายรูปและปริ้นท์อัตโนมัติ',
      'จอทัชสกรีน 18 นิ้ว',
      'ระบบแสงไฟ LED Professional',
      'รองรับการเชื่อมต่อ WiFi',
      'แบตเตอรี่สำรอง 6 ชั่วโมง'
    ],
    price: 'เริ่มต้น 18,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน (4 ชั่วโมง) 18,000 บาท',
      'เต็มวันงาน (8 ชั่วโมง) 25,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 200 แผ่น'
    ],
    specifications: [
      'ขนาด 80x80x200 cm',
      'กล้อง 18MP',
      'ระบบออโต้',
      'น้ำหนัก 30 kg'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 096-962-6465 บีม, 082-491-5575 พี'
  }
};

function ProductCard({ img, title, desc, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-2xl transition flex flex-col border">
      <img src={img} alt={title} className="w-full h-40 object-contain bg-white rounded-t-xl" />
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="font-semibold text-lg mb-1 text-black">{title}</div>
        <div className="text-black text-sm text-center mb-4">{desc}</div>
        <button 
          onClick={() => onViewDetails(title)}
          className="mt-auto text-blue-500 underline bg-blue-50 rounded px-4 py-1 font-medium transition hover:bg-blue-100"
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
}


// Modal Component
function ProductModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black">{product.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-80 object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">ราคา</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{product.price}</p>
                <div className="space-y-2">
                  {product.priceDetails.map((detail, index) => (
                    <p key={index} className="text-gray-700">• {detail}</p>
                  ))}
                </div>
              </div>

              {/* Contact & Action Buttons */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-black mb-6">ติดต่อสอบถาม</h3>
                <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaLine className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium">Line: @pbphotobooth</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium">096-962-6465 บีม</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 font-medium">082-491-5575 พี</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => window.open('https://line.me/R/ti/p/@pbphotobooth', '_blank')}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-3 text-lg"
                  >
                    <FaComments />
                    สอบถามราคา
                  </button>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <button 
                      onClick={() => window.open('tel:0969626465', '_self')}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-3 text-lg"
                    >
                      <FaPhone />
                      <span>โทร บีม</span>
                    </button>
                    <button 
                      onClick={() => window.open('tel:0824915575', '_self')}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-3 text-lg"
                    >
                      <FaPhone />
                      <span>โทร พี</span>
                    </button>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-3 text-lg">
                    <FaInfoCircle />
                    รายละเอียดเพิ่มเติม
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 bg-white rounded-xl border p-6">
            <h3 className="text-2xl font-bold text-black mb-6">คุณสมบัติเด่น</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-black mb-6">ข้อมูลทางเทคนิค</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex items-start p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                    <span className="text-white text-sm font-bold">•</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (productTitle) => {
    console.log('Clicked product:', productTitle);
    const product = productDetails[productTitle];
    console.log('Product data:', product);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
      console.log('Modal should open now');
    } else {
      console.log('Product not found!');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
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
            <ProductCard img={photoboothImg} title="PhotoBooth" desc="งานแต่งงาน งานสมัชชา และงานกิจกรรมต่างๆ" onViewDetails={handleViewDetails} />
            <ProductCard img={blessImg} title="PB Memory" desc="ตู้ปิดคำภาพเพื่อของขวัญ แถม AI ด้วย" onViewDetails={handleViewDetails} />
            <ProductCard img={video360Img} title="360 Video Booth" desc="เวทีหมุน 360 องศา ถ่ายรูปและวิดีโอ เจ๋งมาก" onViewDetails={handleViewDetails} />
            <ProductCard img={B1Img} title="Photobooth Box B1" desc="บูธถ่ายรูปขนาดเล็ก เหมาะสำหรับงานขนาดเล็ก" onViewDetails={handleViewDetails} />
            <ProductCard img={B2Img} title="Photobooth Box B2" desc="บูธถ่ายรูปขนาดกลาง เหมาะสำหรับงานทั่วไป" onViewDetails={handleViewDetails} />
            
            {/* แถวที่ 2 */}
            <ProductCard img={B3Img} title="Photobooth Box B3" desc="บูธถ่ายรูปขนาดใหญ่ เหมาะสำหรับงานใหญ่" onViewDetails={handleViewDetails} />
            <ProductCard img={B4Img} title="Photobooth Box B4" desc="บูธถ่ายรูปพรีเมียม เหมาะสำหรับงานหรู" onViewDetails={handleViewDetails} />
            <ProductCard img={miniaiImg} title="AI mini studio" desc="Photo ไฟฟ้า Gen Ai งานแต่งงานสุดล้ำ" onViewDetails={handleViewDetails} />
            <ProductCard img={aumongImg} title="อุโมงค์" desc="จากลิงพร้อมไฟ RGB กับใหม่ด้วยโจทย์ ของอุโมงค์ 3x4 เมตร" onViewDetails={handleViewDetails} />
            <ProductCard img={aiphotoImg} title="AI Photobooth" desc="ระบบ AI จากระดับมืออาชีพ ล้ำสมัยระดับโลก" onViewDetails={handleViewDetails} />
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={selectedProduct} 
      />
    </>
  );
};

export default ProductSection; 