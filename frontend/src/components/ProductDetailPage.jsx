import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialSidebar from './SocialSidebar';
import MobileMenu from './MobileMenu';
import logo from '../assets/pblogo.png';

// Import product images
import aiphotoImg from '../assets/slidehero/Ai2.png';
import video360Img from '../assets/slidehero/pb2.png';
import photoboothImg from '../assets/slidehero/pb.png';
import blessImg from '../assets/slidehero/PBMemory.png';
import B1Img from '../assets/slidehero/B1.png';
import B2Img from '../assets/slidehero/B2.png';
import B3Img from '../assets/slidehero/B3.png';
import B4Img from '../assets/slidehero/B4.png';
import aumongImg from '../assets/slidehero/aumong.png';
import miniaiImg from '../assets/slidehero/miniai.png';

// Product data with images
const productDatabase = {
  'photobooth': {
    title: 'PhotoBooth',
    description: 'งานแต่งงาน งานสมัชชา และงานกิจกรรมต่างๆ',
    image: photoboothImg,
    features: [
      'ถ่ายรูปและปริ้นท์ขนาด 2x6" และ 4x6" ไม่จำกัดจำนวน',
      'รับไฟล์ภาพทันทีทาง Airdrop หรือ QR Code',
      'กล้อง Mirrorless ภาพคมชัด HD',
      'จอทัชสกรีน Live view แบบ Realtime',
      'ฟรีค่าออกแบบกรอบรูปตามธีม',
      'อุปกรณ์ Props ให้เลือกมากมาย',
      'ทีมงานมืออาชีพดูแลตลอดงาน',
      'ระบบปริ้นท์คุณภาพสูง',
      'รองรับงานทุกรูปแบบ'
    ],
    specifications: [
      'ขนาดบูธ: 2x2 เมตร',
      'ความสูง: 2.5 เมตร', 
      'กล้อง: Sony Mirrorless 24MP',
      'ปริ้นเตอร์: Canon Selphy CP1500',
      'จอแสดงผล: 32 นิ้ว Touch Screen',
      'ระบบแสง: LED Ring Light Professional'
    ],
    price: 'เริ่มต้น 15,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 15,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 25,000 บาท', 
      'แพ็คเกจเต็มวัน: 35,000 บาท',
      'รวมค่าตั้งค่าและทีมงาน',
      'ไม่รวมค่าเดินทางต่างจังหวัด'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [photoboothImg, B1Img, B2Img] // เพิ่มรูปแกลเลอรี่
  },
  'pb-memory': {
    title: 'PB Memory',
    description: 'ตู้ปิดคำภาพเพื่อของขวัญ แถม AI ด้วย',
    image: blessImg,
    features: [
      'ส่งคำอวยพรออนไลน์ให้กับคู่บ่าวสาว',
      'ไม่อยู่ในงานก็ส่งได้',
      'ภาพสำเร็จทันที พร้อมพิมพ์',
      'งาน Meet and Greet ก็เก็บได้',
      'ระบบ AI สร้างภาพที่น่าประทับใจ',
      'แอพพลิเคชั่นใช้งานง่าย',
      'รองรับการแชร์โซเชียลมีเดีย',
      'ระบบจัดเก็บไฟล์อัตโนมัติ'
    ],
    specifications: [
      'แอพพลิเคชั่น: iOS และ Android',
      'ระบบ AI: Real-time Processing',
      'ความจุ: ไม่จำกัดจำนวนภาพ',
      'รูปแบบไฟล์: JPG, PNG, MP4',
      'ระบบแชร์: QR Code, AirDrop',
      'ระยะเวลาเก็บไฟล์: 1 ปี'
    ],
    price: 'เริ่มต้น 8,000 บาท',
    priceDetails: [
      'แพ็คเกจพื้นฐาน: 8,000 บาท',
      'แพ็คเกจ Premium: 15,000 บาท',
      'รวมการตั้งค่าระบบ',
      'รวมการฝึกอบรมการใช้งาน',
      'รองรับได้ไม่จำกัดจำนวนผู้ใช้'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [blessImg, miniaiImg, aiphotoImg]
  },
  '360-video-booth': {
    title: '360 Video Booth',
    description: 'เวทีหมุน 360 องศา ถ่ายรูปและวิดีโอ เจ๋งมาก',
    image: video360Img,
    features: [
      'เวทีหมุน 360 องศาอัตโนมัติ',
      'ถ่ายวิดีโอ Slow Motion คุณภาพ HD',
      'ระบบแสงไฟ LED เอฟเฟกต์สวยงาม',
      'พื้นที่รองรับ 3-6 คน',
      'รับไฟล์ทันทีผ่าน QR Code',
      'ทีมงานมืออาชีพควบคุมตลอดงาน',
      'เอฟเฟกต์พิเศษหลากหลาย',
      'รองรับการถ่ายทั้งวิดีโอและภาพนิ่ง'
    ],
    specifications: [
      'เส้นผ่านศูนย์กลาง: 1.2 เมตร',
      'ความเร็วหมุน: ปรับได้ 3 ระดับ',
      'กล้อง: 4K Ultra HD Camera',
      'แสงไฟ: RGB LED Strip 360°',
      'น้ำหนัก: รองรับได้ถึง 500 กก.',
      'ระบบควบคุม: Tablet Control Panel'
    ],
    price: 'เริ่มต้น 25,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 25,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 40,000 บาท',
      'แพ็คเกจเต็มวัน: 55,000 บาท',
      'รวมการติดตั้งและทดสอบ',
      'รวมทีมงานเทคนิค 2 คน'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [video360Img, B3Img, B4Img]
  },
  'ai-photobooth': {
    title: 'AI Photobooth',
    description: 'ระบบ AI จากระดับมืออาชีพ ล้ำสมัยระดับโลก',
    image: aiphotoImg,
    features: [
      'ระบบ AI สร้างภาพแบบ Real-time',
      'เทคโนโลยีการประมวลผลภาพล้ำสมัย',
      'สร้างภาพสไตล์ต่างๆ หลากหลาย',
      'คุณภาพภาพระดับมืออาชีพ',
      'ใช้งานง่าย เพียงแค่ยืนถ่ายรูป',
      'ไฟล์ภาพส่งทันทีผ่านระบบออนไลน์',
      'รองรับ Face Enhancement',
      'Background Replacement แบบ AI'
    ],
    specifications: [
      'ระบบ AI: Neural Network Processing',
      'ความเร็วประมวลผล: 3-5 วินาที',
      'ความละเอียด: 4K (3840x2160)',
      'ระบบปฏิบัติการ: Linux Ubuntu',
      'หน่วยความจำ: 32GB RAM',
      'การ์ดกราฟิก: NVIDIA RTX 4080'
    ],
    price: 'เริ่มต้น 20,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 20,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 35,000 บาท',
      'แพ็คเกจเต็มวัน: 50,000 บาท',
      'รวมการปรับแต่ง AI Model',
      'รวมทีมงานเทคนิค AI'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [aiphotoImg, miniaiImg, aumongImg]
  },
  'photobooth-box-b1': {
    title: 'Photobooth Box B1',
    description: 'Photo ไฟฟ้า เสียง ส่ายไปคาสิโน ลูกโป่งแดงฟ้องฟุ้งกาลเวลา',
    image: B1Img,
    features: [
      'ดีไซน์สไตล์คาสิโนสุดเจ๋ง',
      'ระบบแสงไฟ LED หลากสี',
      'เอฟเฟกต์เสียงประกอบ',
      'ลูกโป่งประดับตกแต่ง',
      'พื้นหลังสีสันสดใส',
      'เหมาะสำหรับงานปาร์ตี้',
      'ถ่ายรูปกลุ่มได้สูงสุด 6 คน',
      'ระบบควบคุมง่ายใช้งานสะดวก'
    ],
    specifications: [
      'ขนาดบูธ: 2.5x2.5 เมตร',
      'ความสูง: 2.8 เมตร',
      'แสงไฟ: RGB LED Strip + Disco Ball',
      'เสียง: Bluetooth Speaker System',
      'กล้อง: DSLR Canon 24MP',
      'การตกแต่ง: ลูกโป่งฟอยล์ + LED'
    ],
    price: 'เริ่มต้น 18,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 18,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 28,000 บาท',
      'แพ็คเกจเต็มวัน: 38,000 บาท',
      'รวมอุปกรณ์ตกแต่งครบชุด',
      'รวมทีมงานจัดแต่งและดูแล'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [B1Img, photoboothImg, blessImg]
  },
  'photobooth-box-b2': {
    title: 'Photobooth Box B2',
    description: 'Photo ไฟฟ้าเจ้าระเบียง สวยงามในรูปแบบคลาสสิค',
    image: B2Img,
    features: [
      'ดีไซน์คลาสสิคหรูหรา',
      'โทนสีทองและขาวสไตล์วินเทจ',
      'ระบบแสงไฟอบอุ่น',
      'พื้นหลังลายไทยประยุกต์',
      'เหมาะสำหรับงานแต่งงาน',
      'บรรยากาศโรแมนติก',
      'Props สไตล์ย้อนยุค',
      'คุณภาพภาพระดับ Professional'
    ],
    specifications: [
      'ขนาดบูธ: 2x3 เมตร',
      'ความสูง: 2.5 เมตร',
      'แสงไฟ: Warm LED + Spotlight',
      'พื้นหลัง: ผ้าไหมลายไทย',
      'กล้อง: Mirrorless Sony 32MP',
      'การตกแต่ง: ทองเหลือง + ดอกไม้'
    ],
    price: 'เริ่มต้น 22,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 22,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 35,000 บาท',
      'แพ็คเกจเต็มวัน: 45,000 บาท',
      'รวมการตกแต่งสไตล์คลาสสิค',
      'รวม Props พิเศษ'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [B2Img, B1Img, photoboothImg]
  },
  'photobooth-box-b3': {
    title: 'Photobooth Box B3',
    description: 'Photo ไฟฟ้าเจ้าระเบียง แบบมินิมอลไม่แปลกใส',
    image: B3Img,
    features: [
      'ดีไซน์มินิมอลสไตล์โมเดิร์น',
      'โทนสีขาวเรียบง่าย',
      'แสงไฟ Soft Light นุ่มตา',
      'พื้นหลังสีพื้นเรียบ',
      'เหมาะสำหรับงานธุรกิจ',
      'ลุคสะอาดมืออาชีพ',
      'เน้นความเรียบง่าย',
      'ถ่ายภาพโปรไฟล์สวย'
    ],
    specifications: [
      'ขนาดบูธ: 2x2.5 เมตร',
      'ความสูง: 2.4 เมตร',
      'แสงไฟ: LED Soft Box Professional',
      'พื้นหลัง: Seamless Paper White',
      'กล้อง: Canon EOS R5 45MP',
      'การตกแต่ง: มินิมอลเรียบง่าย'
    ],
    price: 'เริ่มต้น 16,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 16,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 26,000 บาท',
      'แพ็คเกจเต็มวัน: 35,000 บาท',
      'รวมอุปกรณ์แสงมืออาชีพ',
      'รวมการจัดเตรียมพื้นหลัง'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [B3Img, B4Img, video360Img]
  },
  'photobooth-box-b4': {
    title: 'Photobooth Box B4',
    description: 'Photo Cocktail with ดีไซน์ทันสมัยและหรูหรา',
    image: B4Img,
    features: [
      'ดีไซน์หรูหราสไตล์ Cocktail Bar',
      'โทนสีดำทองสุดเท่',
      'แสงไฟ Neon สีสันสดใส',
      'บาร์เคาน์เตอร์จำลอง',
      'เหมาะสำหรับงาน Corporate',
      'บรรยากาศผับ & คลับ',
      'Props อุปกรณ์บาร์เทนเดอร์',
      'เอฟเฟกต์แสงสไตล์โมเดิร์น'
    ],
    specifications: [
      'ขนาดบูธ: 3x2.5 เมตร',
      'ความสูง: 2.6 เมตร',
      'แสงไฟ: RGB Neon + LED Bar',
      'พื้นหลัง: Dark Theme + Gold Accent',
      'กล้อง: Sony A7R IV 61MP',
      'การตกแต่ง: Bar Counter + Neon Signs'
    ],
    price: 'เริ่มต้น 25,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 25,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 40,000 บาท',
      'แพ็คเกจเต็มวัน: 55,000 บาท',
      'รวมการจัดแต่งสไตล์บาร์',
      'รวม Props และอุปกรณ์พิเศษ'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [B4Img, B3Img, aiphotoImg]
  },
  'ai-mini-studio': {
    title: 'AI mini studio',
    description: 'Photo ไฟฟ้า Gen AI งานแต่งงานสุดล้ำ',
    image: miniaiImg,
    features: [
      'ระบบ AI สร้างภาพแต่งงานสุดล้ำ',
      'เปลี่ยนชุดแต่งงานดิจิทัล',
      'สร้างฉากหลังงานแต่งใหม่',
      'ปรับแต่งสีผิวและใบหน้า',
      'เพิ่มเอฟเฟกต์โรแมนติก',
      'ขนาดสตูดิโอกะทัดรัด',
      'เหมาะสำหรับงานแต่งเล็ก',
      'ผลงานได้ในเวลาเรียลไทม์'
    ],
    specifications: [
      'ขนาดสตูดิโอ: 1.5x2 เมตร',
      'ความสูง: 2.2 เมตร',
      'ระบบ AI: Wedding Specific Model',
      'ความเร็วประมวลผล: 2-3 วินาที',
      'ความละเอียด: 6K (6144x4096)',
      'การ์ดกราฟิก: RTX 4090 24GB'
    ],
    price: 'เริ่มต้น 12,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 12,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 22,000 บาท',
      'แพ็คเกจเต็มวัน: 32,000 บาท',
      'รวมการปรับแต่ง AI Model งานแต่ง',
      'รวมฟิลเตอร์และเอฟเฟกต์พิเศษ'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [miniaiImg, aiphotoImg, blessImg]
  },
  'อุโมงค์': {
    title: 'อุโมงค์',
    description: 'จากลิงพร้อมไฟ RGB กับใหม่ด้วยโจทย์ ของอุโมงค์ 3x4 เมตร',
    image: aumongImg,
    features: [
      'อุโมงค์แสงไฟ RGB สุดยิ่งใหญ่',
      'ขนาดใหญ่ 3x4 เมตร',
      'เอฟเฟกต์แสงไฟเปลี่ยนสี',
      'บรรยากาศอนาคต Sci-Fi',
      'เหมาะสำหรับงานใหญ่',
      'สร้างความประทับใจสูงสุด',
      'ถ่ายรูปกลุ่มใหญ่ได้',
      'ระบบเสียงประกอบ'
    ],
    specifications: [
      'ขนาดอุโมงค์: 3x4 เมตร',
      'ความสูง: 3 เมตร',
      'แสงไฟ: RGB LED 360° + Laser',
      'ระบบเสียง: Surround Sound',
      'กล้อง: Ultra Wide Lens Camera',
      'การควบคุม: DMX Controller'
    ],
    price: 'เริ่มต้น 45,000 บาท',
    priceDetails: [
      'แพ็คเกจ 4 ชั่วโมง: 45,000 บาท',
      'แพ็คเกจ 8 ชั่วโมง: 75,000 บาท',
      'แพ็คเกจเต็มวัน: 120,000 บาท',
      'รวมการติดตั้งและการออกแบบ',
      'รวมทีมงานเทคนิค 4 คน'
    ],
    contact: 'Line: @pbphotobooth หรือ Tel: 02-XXX-XXXX',
    gallery: [aumongImg, video360Img, B1Img]
  }
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [open, setOpen] = useState(false);

  // Menu items สำหรับ navbar
  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/#about' },
    { label: 'PORTFOLIO', href: '/#portfolio' },
    { label: 'PACKAGE', href: '/#package' },
    { label: 'OUR CLIENTS', href: '/#clients' },
    { label: 'CONTACT', href: '/#contact' },
  ];

  useEffect(() => {
    const productData = productDatabase[slug];
    if (productData) {
      setProduct(productData);
    } else {
      // หากไม่พบสินค้า ให้กลับไปหน้าหลัก
      navigate('/');
    }
  }, [slug, navigate]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Navigation with Background */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg">
        <Header open={open} setOpen={setOpen} menuItems={menuItems} logo={logo} />
      </div>
      <MobileMenu open={open} setOpen={setOpen} menuItems={menuItems} logo={logo} />
      
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b mt-16 md:mt-20">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            กลับหน้าหลัก
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <img 
                src={product.gallery[selectedImage]} 
                alt={product.title}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index 
                      ? 'border-blue-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain bg-white"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

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

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">คุณสมบัติเด่น</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ข้อมูลทางเทคนิค</h3>
              <ul className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ติดต่อสอบถาม</h3>
              <p className="text-gray-700 mb-6">{product.contact}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition text-lg">
                  💬 สอบถามราคา
                </button>
                <button className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition text-lg">
                  📅 จองเลย
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer & Other Components */}
      <Footer />
      <SocialSidebar />
    </div>
  );
};

export default ProductDetailPage; 