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
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
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
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
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
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'Photobooth Box B1': {
    title: 'Photobooth Box B1',
    image: B1Img,
    description: 'Photo ไฟฟ้า เสีย ส่ายไปคาสิโน่ ลูกโป่งแด่งฟ้องฟุ้งกาลเวลา',
    features: [
      'ดีไซน์คลาสสิคหรูหรา',
      'ถ่ายรูปและปริ้นท์ทันที',
      'ระบบแสงไฟในตัว',
      'จอ LCD แสดงผลชัด',
      'Props และอุปกรณ์ประกอบ',
      'ใช้งานง่าย เหมาะกับทุกงาน'
    ],
    price: 'เริ่มต้น 12,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน 12,000 บาท',
      'เต็มวันงาน 18,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์'
    ],
    specifications: [
      'ขนาดกะทัดรัด พกพาสะดวก',
      'กล้อง HD Built-in',
      'เครื่องปริ้นท์ความร้อน',
      'แบตเตอรี่ 8 ชั่วโมง'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'Photobooth Box B2': {
    title: 'Photobooth Box B2',
    image: B2Img,
    description: 'Photo ไฟฟ้าเจ้าระเบียง สวยงามในรูปแบบคลาสสิค',
    features: [
      'ดีไซน์คลาสสิคสวยงาม',
      'ระบบไฟ LED ใน Box',
      'จอแสดงผลคมชัด',
      'ระบบเสียงในตัว',
      'Props หลากหลาย',
      'เหมาะกับงานอีเวนท์'
    ],
    price: 'เริ่มต้น 14,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน 14,000 บาท',
      'เต็มวันงาน 20,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมอุปกรณ์ครบชุด'
    ],
    specifications: [
      'ขนาด 80x60x180 cm',
      'กล้อง DSLR External',
      'ระบบไฟ LED Strip',
      'จอ Monitor 19 นิ้ว'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'Photobooth Box B3': {
    title: 'Photobooth Box B3',
    image: B3Img,
    description: 'Photo ไฟฟ้าเจ้าระเบียง แบบมินิมอลไม่แปลกใส',
    features: [
      'ดีไซน์มินิมอล สะอาดตา',
      'ขนาดกะทัดรัด',
      'ระบบไฟแบบนุ่มนวล',
      'เหมาะกับงานเล็ก',
      'ติดตั้งง่าย',
      'ประหยัดพื้นที่'
    ],
    price: 'เริ่มต้น 10,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน 10,000 บาท',
      'เต็มวันงาน 15,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมกระดาษพิมพ์ 150 แผ่น'
    ],
    specifications: [
      'ขนาดเล็กกะทัดรัด',
      'กล้อง Webcam HD',
      'ระบบไฟ LED Soft',
      'จอ Tablet 10 นิ้ว'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'Photobooth Box B4': {
    title: 'Photobooth Box B4',
    image: B4Img,
    description: 'Photo Cocktal with ดีไซน์ทันสมัยและหรูหรา',
    features: [
      'ดีไซน์ทันสมัยหรูหรา',
      'เหมาะกับงาน Cocktail',
      'ระบบไฟสวยงาม',
      'ขนาดเหมาะสำหรับงานเลี้ยง',
      'มีที่วางเครื่องดื่ม',
      'สร้างบรรยากาศหรูหรา'
    ],
    price: 'เริ่มต้น 16,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน 16,000 บาท',
      'เต็มวันงาน 22,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวมการตกแต่ง'
    ],
    specifications: [
      'ขนาด 100x70x200 cm',
      'กล้อง Professional',
      'ระบบไฟ RGB',
      'จอ Touch Screen 24 นิ้ว'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'AI mini studio': {
    title: 'AI mini studio',
    image: miniaiImg,
    description: 'Photo ไฟฟ้า Gen Ai งานแต่งงานสุดล้ำ',
    features: [
      'ระบบ AI ล้ำสมัย',
      'สร้างภาพแบบ Real-time',
      'ขนาดกะทัดรัด',
      'เทคโนโลยีใหม่ล่าสุด',
      'ใช้งานง่าย',
      'ผลลัพธ์ทันที'
    ],
    price: 'เริ่มต้น 18,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน 18,000 บาท',
      'เต็มวันงาน 25,000 บาท',
      'รวมทีมงาน 1 คน',
      'รวม AI Processing'
    ],
    specifications: [
      'AI Image Generation',
      'GPU Processing Unit',
      'กล้อง 4K',
      'จอ OLED 15 นิ้ว'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'อุโมงค์': {
    title: 'อุโมงค์',
    image: aumongImg,
    description: 'จากลิงพร้อมไฟ RGB กับใหม่ด้วยโจทย์ ของอุโมงค์ 3x4 เมตร',
    features: [
      'ขนาดใหญ่ 3x4 เมตร',
      'ระบบไฟ RGB เปลี่ยนสี',
      'สร้างบรรยากาศพิเศษ',
      'เหมาะกับงานใหญ่',
      'รองรับคนได้มาก',
      'เอฟเฟกต์แสงสวยงาม'
    ],
    price: 'เริ่มต้น 30,000 บาท',
    priceDetails: [
      'ครึ่งวันงาน 30,000 บาท',
      'เต็มวันงาน 45,000 บาท',
      'รวมทีมงาน 3 คน',
      'รวมการติดตั้ง'
    ],
    specifications: [
      'ขนาด 3x4x2.5 เมตร',
      'ระบบไฟ RGB LED',
      'โครงสร้างอลูมิเนียม',
      'ผ้าคลุมกันแสง'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
  },
  'AI Photobooth': {
    title: 'AI Photobooth',
    image: aiphotoImg,
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
    priceDetails: [
      'ครึ่งวันงาน 20,000 บาท',
      'เต็มวันงาน 30,000 บาท',
      'รวมทีมงาน 2 คน',
      'รวม AI Processing ไม่จำกัด'
    ],
    specifications: [
      'AI Neural Network',
      'GPU RTX 4080',
      'กล้อง Sony Alpha',
      'จอ 4K Display 27 นิ้ว'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX'
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
              className="text-gray-500 hover:text-gray-700 text-3xl"
            >
              ×
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
                <h3 className="text-xl font-bold text-black mb-4">ติดต่อสอบถาม</h3>
                <p className="text-gray-700 mb-4">{product.contact}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                    💬 สอบถามราคา
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition">
                    📅 จองเลย
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 bg-white rounded-xl border p-6">
            <h3 className="text-2xl font-bold text-black mb-4">คุณสมบัติเด่น</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-black mb-4">ข้อมูลทางเทคนิค</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{spec}</span>
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
            <ProductCard img={B1Img} title="Photobooth Box B1" desc="Photo ไฟฟ้า เสีย ส่ายไปคาสิโน่ ลูกโป่งแด่งฟ้องฟุ้งกาลเวลา" onViewDetails={handleViewDetails} />
            <ProductCard img={B2Img} title="Photobooth Box B2" desc="Photo ไฟฟ้าเจ้าระเบียง สวยงามในรูปแบบคลาสสิค" onViewDetails={handleViewDetails} />
            
            {/* แถวที่ 2 */}
            <ProductCard img={B3Img} title="Photobooth Box B3" desc="Photo ไฟฟ้าเจ้าระเบียง แบบมินิมอลไม่แปลมใส" onViewDetails={handleViewDetails} />
            <ProductCard img={B4Img} title="Photobooth Box B4" desc="Photo Cocktal with ดีไซน์ทันสมัยและหรูหรา" onViewDetails={handleViewDetails} />
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