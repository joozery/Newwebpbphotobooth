import { FaFacebookF, FaInstagram, FaLine, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from '../assets/pblogo.png';

export default function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 pt-10 pb-4 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="PhotoBooth Pro Logo" className="h-10 mb-2" />
          <p className="text-gray-500 text-sm mt-2">
            รวมไอเดียถ่ายภาพและบริการบูธถ่ายรูปคุณภาพ
          </p>
          <p className="text-gray-500 text-xs mt-2">
            PB PhotoBooth 199/183 ถนน นาวงประชาพัฒนา แขวงสีกัน เขตดอนเมือง กรุงเทพมหานคร 10210
          </p>
        </div>

        {/* สำหรับร้านค้า */}
        <div>
          <h3 className="font-semibold mb-2">สำหรับร้านค้า</h3>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li><a href="#" className="hover:underline">สมัครเป็นพาร์ทเนอร์กับเรา</a></li>
          </ul>
        </div>

        {/* สำหรับผู้ใช้งาน */}
        <div>
          <h3 className="font-semibold mb-2">สำหรับผู้ใช้งาน</h3>
          <ul className="space-y-1 text-gray-600 text-sm">
            <li><a href="#" className="hover:underline">รวมสินค้า&บริการ</a></li>
            <li><a href="#" className="hover:underline">สถานที่ถ่ายภาพ</a></li>
            <li><a href="#" className="hover:underline">รวมไอเดีย</a></li>
            <li><a href="#" className="hover:underline">บทความ</a></li>
            <li><a href="#" className="hover:underline">เงื่อนไขการใช้เว็บไซต์</a></li>
            <li><a href="#" className="hover:underline">เงื่อนไขและข้อตกลงการใช้บริการ</a></li>
            <li><a href="#" className="hover:underline">นโยบายความเป็นส่วนตัว</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-2">ติดต่อทีมงาน PhotoBooth Pro</h3>
          <div className="flex space-x-3 mb-2">
            <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF size={20} /></a>
            <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram size={20} /></a>
            <a href="#" className="text-green-500 hover:text-green-700"><FaLine size={20} /></a>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <FaEnvelope className="mr-2" /> sw_customercare@photoboothpro.com
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <FaPhone className="mr-2" /> 082-656-5696
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} PhotoBooth Pro. All rights reserved.
      </div>
    </footer>
  );
} 