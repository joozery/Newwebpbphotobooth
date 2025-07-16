import Header from './components/Header'
import HeroSlider from './components/HeroSlider'
import Footer from './components/Footer'
import { FaPencilAlt } from 'react-icons/fa';
import photoboothImg from './assets/photobooth.jpg';
import aiphotoImg from './assets/Aiphoto.jpg';
import blessImg from './assets/bless.jpg';
import video360Img from './assets/360video.jpg';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import uobVideo from './assets/video/uob.mp4';
import charleskeithVideo from './assets/video/charleskeith.mp4';
import thespfpartyVideo from './assets/video/thespfparty.mp4';
import runingVideo from './assets/video/runing.mp4';
import wish1 from './assets/wish1.jpg';
import wish2 from './assets/wish2.jpg';
import wish3 from './assets/wish3.jpg';
import gallery1 from './assets/gallery/1.jpg';
import gallery2 from './assets/gallery/2.jpg';
import gallery3 from './assets/gallery/3.jpg';
import gallery4 from './assets/gallery/4.jpg';
import gallery5 from './assets/gallery/5.jpg';
import gallery6 from './assets/gallery/6.jpg';
import gallery7 from './assets/gallery/7.jpg';
import gallery8 from './assets/gallery/8.jpg';
import { FaRegStar, FaStar, FaRegGem, FaGem } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import clients1 from './assets/clients/clients1.jpg';
import clients2 from './assets/clients/clients2.jpg';
import clients3 from './assets/clients/clients3.jpg';
import clients4 from './assets/clients/clients4.jpg';
import clients5 from './assets/clients/clients5.jpg';
import clients6 from './assets/clients/clients6.jpg';
import clients7 from './assets/clients/clients7.jpg';
import clients8 from './assets/clients/clients8.jpg';
import clients9 from './assets/clients/clients9.jpg';
import clients10 from './assets/clients/clients10.jpg';
import { FaFacebookF, FaInstagram, FaLine, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes, FaCommentDots, FaYoutube, FaTiktok } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import MobileMenu from './components/MobileMenu'
import logo from './assets/pblogo.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import SocialSidebar from './components/SocialSidebar';
// ไม่ต้อง import .jpg อีกต่อไป

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 }
  }
};

function ProductCard({ img, title, desc }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow hover:shadow-2xl transition flex flex-col border"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
    >
      <img src={img} alt={title} className="w-full h-40 object-cover rounded-t-xl" />
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="font-semibold text-lg mb-1 text-black">{title}</div>
        <div className="text-black text-sm text-center mb-4">{desc}</div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="mt-auto text-blue-500 underline bg-blue-50 rounded px-4 py-1 font-medium transition"
        >
          ดูรายละเอียด
        </motion.button>
      </div>
    </motion.div>
  );
}

function VideoCard({ src, poster, title, duration }) {
  // const videoRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow flex flex-col border p-4 items-center"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-full aspect-[9/16] rounded-xl border-2 border-red-200 flex items-center justify-center relative overflow-hidden mb-3">
        <video
          src={src}
          poster={poster}
          className="object-cover w-full h-full bg-gray-200 rounded-xl"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
        {/* ไม่ต้องแสดงปุ่ม play overlay */}
        <span className="absolute left-2 bottom-2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xs text-red-400 flex items-center"><svg className="mr-1" width="16" height="16" fill="none"><path d="M8 3v5l4 2" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="7" stroke="#F44336" strokeWidth="2"/></svg>{duration}</span>
        <span className="absolute right-2 bottom-2 bg-white bg-opacity-80 rounded-full p-1 text-xs text-red-400 flex items-center"><svg className="mr-1" width="16" height="16" fill="none"><circle cx="8" cy="8" r="7" stroke="#F44336" strokeWidth="2"/><path d="M8 5v6" stroke="#F44336" strokeWidth="2" strokeLinecap="round"/><path d="M8 11h.01" stroke="#F44336" strokeWidth="2" strokeLinecap="round"/></svg></span>
      </div>
      <div className="font-semibold text-sm mb-1 w-full text-left">{title}</div>
    </motion.div>
  );
}

function PackageSection() {
  const packages = [
    {
      icon: <FaRegStar size={40} />,
      price: "฿9,900",
      name: "STANDARD",
      details: [
        "ขนาดรูป 2x6\"",
        "ไม่จำกัดจำนวน",
        "ระยะเวลา 4 ชม.",
      ],
      highlight: false,
    },
    {
      icon: <FaStar size={40} />,
      price: "฿10,900",
      name: "SUPER STANDARD",
      details: [
        "ขนาดรูป 2x6\"",
        "ไม่จำกัดจำนวน",
        "ระยะเวลา 4 ชม.",
        "แม่เหล็ก 100 ชิ้น",
      ],
      highlight: true,
    },
    {
      icon: <FaRegGem size={40} />,
      price: "฿14,900",
      name: "PREMIUM",
      details: [
        "ขนาดรูป 4x6\"",
        "ไม่จำกัดจำนวน",
        "ระยะเวลา 4 ชม.",
      ],
      highlight: false,
    },
    {
      icon: <FaGem size={40} />,
      price: "฿16,900",
      name: "SUPER PREMIUM",
      details: [
        "ขนาดรูป 4x6\"",
        "ไม่จำกัดจำนวน",
        "ระยะเวลา 4 ชม.",
        "แม่เหล็ก 50 ชิ้น",
      ],
      highlight: true,
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <h2 className="text-4xl font-extrabold text-center text-black mb-12 tracking-tight">PACKAGE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className={`
              flex flex-col items-center rounded-3xl p-8 shadow-xl border-2 transition
              ${pkg.highlight
                ? "bg-white border-pink-300 scale-105 ring-4 ring-pink-100"
                : "bg-white/80 border-blue-100"
              }
              relative
            `}
            style={{ minHeight: 480 }}
          >
            {pkg.highlight && (
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow">แนะนำ</span>
            )}
            <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-white/60 shadow-inner ring-2 ring-blue-100">
              {pkg.icon}
            </div>
            <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-pink-400 bg-clip-text text-transparent">{pkg.price}</div>
            <div className="text-lg font-bold tracking-widest mb-4 uppercase border-b-2 border-gradient-to-r from-blue-400 to-pink-400 pb-1">{pkg.name}</div>
            <ul className="mb-8 space-y-3 text-base w-full">
              {pkg.details.map((d, j) => (
                <li key={j} className="flex items-center gap-2 justify-center">
                  <BsHeartFill className={`text-pink-400 ${pkg.highlight ? 'animate-bounce' : ''}`} />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <button
              className={`
                mt-auto px-8 py-2 rounded-full font-bold text-lg shadow-lg transition
                ${pkg.highlight
                  ? "bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:from-pink-500 hover:to-blue-500"
                  : "bg-white border-2 border-blue-400 text-blue-700 hover:bg-blue-50"
                }
              `}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function OurClientsSection() {
  const clients = [
    clients1, clients2, clients3, clients4, clients5,
    clients6, clients7, clients8, clients9, clients10
  ];
  return (
    <section className="max-w-7xl mx-auto w-full py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-4 tracking-tight">OUR CLIENTS</h2>
      <p className="text-center text-gray-500 mb-10">ลูกค้าบางส่วนที่ไว้วางใจ PhotoBooth Pro</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
        {clients.map((logo, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md flex items-center justify-center p-4 transition hover:scale-105 hover:shadow-lg border border-gray-100"
          >
            <img src={logo} alt={`client${i+1}`} className="h-16 object-contain max-w-[120px]" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactPopup() {
  // const [open, setOpen] = React.useState(false);
  return <></>;
}

function App() {
  const [open, setOpen] = React.useState(false);
  const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'PACKAGE', href: '#package' },
    { label: 'OUR CLIENTS', href: '#clients' },
    { label: 'CONTACT', href: '#contact' },
  ];
  return (
    <HelmetProvider>
      <Helmet>
        <title>PhotoBooth Pro | บริการถ่ายภาพงานแต่ง & อีเว้นท์</title>
        <meta name="description" content="PhotoBooth Pro บริการถ่ายภาพงานแต่งและอีเว้นท์ พร้อมบูธถ่ายรูปสุดทันสมัย เก็บทุกความประทับใจในวันสำคัญของคุณ" />
        <meta name="keywords" content="photobooth, ถ่ายภาพ, งานแต่ง, อีเว้นท์, บูธถ่ายรูป, AI photobooth, 360 video booth" />
        <meta property="og:title" content="PhotoBooth Pro | บริการถ่ายภาพงานแต่ง & อีเว้นท์" />
        <meta property="og:description" content="PhotoBooth Pro บริการถ่ายภาพงานแต่งและอีเว้นท์ พร้อมบูธถ่ายรูปสุดทันสมัย เก็บทุกความประทับใจในวันสำคัญของคุณ" />
        <meta property="og:image" content="/cover.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "PhotoBooth Pro",
            "image": "https://yourdomain.com/cover.jpg",
            "url": "https://yourdomain.com",
            "telephone": "082-xxx-xxxx",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ที่อยู่บริษัท",
              "addressLocality": "เขต/อำเภอ",
              "addressRegion": "จังหวัด",
              "postalCode": "รหัสไปรษณีย์",
              "addressCountry": "TH"
            }
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col" id="home">
        <Header open={open} setOpen={setOpen} menuItems={menuItems} logo={logo} />
        <MobileMenu open={open} setOpen={setOpen} menuItems={menuItems} logo={logo} />
        <HeroSlider />
        {/* DEMO Section */}
        <section className="bg-blue-100 py-6 w-full">
          <div className="flex justify-center items-center">
            <FaPencilAlt className="mr-2 text-black" />
            <a href="https://pbphotobooth.netlify.app/event/11" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-black">DEMO ทดลองเขียนคำอวยพร</a>
          </div>
        </section>
        {/* Hero Split Section: หนังสืออวยพร */}
        <section id="about" className="max-w-7xl mx-auto w-full my-16 flex flex-col md:flex-row items-center gap-8 px-4 bg-blue-50 rounded-3xl shadow-lg py-10">
          {/* ซ้าย: ข้อความ */}
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-3">เขียนอวยพรออนไลน์</h2>
            <p className="text-black mb-4 text-lg">
              ส่งความรู้สึกดี ๆ ถึงคู่บ่าวสาวผ่านฟีเจอร์ “เขียนอวยพรออนไลน์”<br/>
              กรอกชื่อและข้อความอวยพรของคุณ ระบบจะส่งถึงเจ้าของงานอย่างอบอุ่นและทันสมัย
            </p>
            <ul className="list-disc list-inside text-black mb-6 text-base">
              <li>ใช้งานง่ายผ่านมือถือหรือคอมพิวเตอร์</li>
              <li>ข้อความอวยพรจะถูกจัดเก็บอย่างปลอดภัย</li>
              <li>เจ้าของงานสามารถอ่านและแชร์คำอวยพรได้ทุกเมื่อ</li>
            </ul>
            <a href="#" className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition text-lg">เขียนอวยพร</a>
          </div>
          {/* ขวา: รูปภาพ (ไม่มีข้อความซ้อน) */}
          <div className="flex-1 flex justify-center">
            <img
              src={blessImg}
              alt="หนังสืออวยพร"
              className="w-[400px] max-w-full rounded-2xl shadow-xl border-4 border-blue-100"
            />
          </div>
        </section>
        {/* Product & Service Section */}
        <section id="portfolio" className="max-w-7xl mx-auto w-full py-10 px-4">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">รวมสินค้าและบริการ</h2>
              <p className="text-black text-sm mt-1">ค้นหาสินค้าและบริการถ่ายภาพงานแต่งที่เหมาะกับคุณ</p>
            </div>
            <button className="border border-gray-300 rounded px-4 py-1 text-black hover:bg-gray-100 transition">ดูทั้งหมด</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ProductCard img={aiphotoImg} title="AI Photobooth" desc="ถ่ายภาพด้วย AI สร้างประสบการณ์ใหม่ในงานแต่ง" />
            <ProductCard img={video360Img} title="360 Video Booth" desc="บูธวิดีโอ 360 องศา เก็บทุกโมเมนต์ประทับใจ" />
            <ProductCard img={photoboothImg} title="PhotoBooth" desc="บูธถ่ายภาพสุดคลาสสิกสำหรับทุกงานแต่ง" />
            <ProductCard img={blessImg} title={<span className="text-black">เขียนอวยพรออนไลน์</span>} desc={<span className="text-black">ส่งคำอวยพรออนไลน์ถึงคู่บ่าวสาวได้ง่าย ๆ</span>} />
          </div>
        </section>
        {/* Portfolio Section */}
        <section id="portfolio" className="max-w-7xl mx-auto w-full py-10 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-1">VDO</h2>
          <p className="text-center text-gray-500 mb-8">Portfolio</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <VideoCard src={uobVideo} poster={'/video/uob.jpg'} title="UOB" duration="2:27" />
            <VideoCard src={charleskeithVideo} poster={'/video/charleskeith.jpg'} title="Charles & Keith" duration="0:37" />
            <VideoCard src={thespfpartyVideo} poster={'/video/thespfparty.jpg'} title="The SPF Party" duration="1:02" />
            <VideoCard src={runingVideo} poster={'/video/runing.jpg'} title="Runing" duration="0:30" />
          </div>
        </section>
        {/* Gallery Section */}
        <section id="gallery" className="max-w-7xl mx-auto w-full py-10 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-1">Gallery</h2>
          <p className="text-center text-gray-500 mb-8">บรรยากาศงานและภาพถ่ายจาก PhotoBooth Pro</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8].map((img, i) => (
              <img key={i} src={img} alt={`gallery${i+1}`} className="w-full h-48 object-cover rounded-xl shadow" />
            ))}
          </div>
          <div className="flex justify-center">
            <a href="https://www.facebook.com/PBPhotoBooths/photos?tab=albums" target="_blank" rel="noopener noreferrer" className="px-8 py-2 rounded-full border-2 border-blue-400 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition text-lg text-center">See More</a>
          </div>
        </section>
        {/* ABOUT US Section */}
        <section id="about" className="max-w-7xl mx-auto w-full py-16 px-4 my-10 bg-white rounded-3xl shadow-lg border-t-8 border-pink-200 flex flex-col items-center text-center">
          <div className="flex flex-col items-center mb-6">
            <span className="inline-block bg-pink-100 rounded-full p-4 mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#F9A8D4"/><path d="M16 20c0-4 3.134-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="19" cy="23" r="2" fill="#fff"/><circle cx="29" cy="23" r="2" fill="#fff"/><path d="M19 31c1.5 1 6.5 1 8 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-2 tracking-tight">ABOUT US</h2>
          </div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
            <span className="font-bold text-pink-500">PB PhotoBooth</span><br/>
            สร้างสีสันและรอยยิ้มในทุกงานสำคัญของคุณ<br/>
            เราพร้อมเก็บภาพความทรงจำดี ๆ<br/>
            ด้วยบริการถ่ายภาพและบูธถ่ายรูปสุดสนุก<br/>
            ราคาเป็นกันเอง เหมาะกับงานแต่ง งานอีเว้นท์ และปาร์ตี้ทุกรูปแบบ<br/>
            ดูแลโดยทีมงานมืออาชีพ ใส่ใจทุกความประทับใจตลอดงาน
          </p>
        </section>
        <div id="package"><PackageSection /></div>
        <div id="clients"><OurClientsSection /></div>
        <div id="contact"><Footer /></div>
        <SocialSidebar />
        <ContactPopup />
      </div>
    </HelmetProvider>
  );
}

export default App;
