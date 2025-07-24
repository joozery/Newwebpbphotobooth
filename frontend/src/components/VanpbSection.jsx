import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import vanpbImg from "../assets/vanpb.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ตัวอย่างข้อมูล (สามารถเปลี่ยนเป็นข้อมูลจริงได้)
const vanpbContent = [
  {
    type: 'image',
    src: vanpbImg,
    alt: 'PB PhotoVan Image',
    title: 'PB PhotoVan'
  },
  {
    type: 'video',
    videoId: '7529373447554665736',
    title: 'PB PhotoVan Demo Video',
    description: 'สาธิตการใช้งาน PB PhotoVan'
  },
  {
    type: 'video',
    videoId: '7529841551799864584',
    title: 'PB PhotoVan Interior',
    description: 'ภายใน PB PhotoVan'
  }
];

const VanpbSection = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  
  // Load TikTok embed script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#f5f5dc] via-[#faf0e6] to-[#f5e6d3] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles (latte tones) */}
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 bg-[#e7d3b0]/40 rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-12 h-12 bg-[#a67c52]/30 rounded-full"
          animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#bca177]/40 rounded-full"
          animate={{ scale: [1, 1.5, 1], rotate: [0, -180, -360] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Wave decoration (light brown) */}
        <motion.div 
          className="absolute bottom-0 w-full opacity-20"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="w-full">
            <path fill="rgba(172, 139, 90, 0.12)" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,165.3C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* เนื้อหาด้านซ้าย */}
          <motion.div 
            className="w-full lg:w-1/2 text-[#5c4327] order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {/* หัวข้อใหม่ PB SnapVan */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#7c4a1e] mb-4">PB PhotoVan</h2>
              {/* รายละเอียด */}
              <div className="space-y-3 text-base md:text-lg leading-relaxed">
                <p>
                  บูธถ่ายรูปในรถตู้วินเทจสุดคลาสสิก<br/>
                  พร้อมให้คุณและเพื่อนถ่ายภาพแบบยูนีคไม่เหมือนใคร<br/>
                  งานปาร์ตี้ งานแต่ง งานอีเวนต์ — รถคันนี้เอาอยู่!
                </p>
                <p>
                  สัมผัสประสบการณ์ถ่ายรูปที่ทั้งสนุกและอบอุ่นในบรรยากาศวินเทจ<br/>
                  ตกแต่งพร็อพและธีมได้ตามใจคุณ เหมาะกับทุกโอกาสสำคัญ<br/>
                  เก็บทุกโมเมนต์ประทับใจในสไตล์ PhotoVan ที่ไม่ซ้ำใคร
                </p>
              </div>
              {/* ปุ่ม CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  className="bg-[#7c4a1e] hover:bg-[#a67c52] text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                  onClick={() => setShowPopup(true)}
                >
                  <span>ดูรายละเอียด</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                <button 
                  onClick={() => window.open('https://line.me/R/ti/p/@pbphotobooth', '_blank')}
                  className="bg-transparent border-2 border-[#7c4a1e] text-[#7c4a1e] hover:bg-[#7c4a1e] hover:text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <span>จองคิว</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          {/* รูปด้านขวา */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div 
                className="w-full max-w-xl aspect-[4/3] rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={vanpbImg}
                  alt="Vanpb Photobooth"
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
              </motion.div>
              {/* Animated Decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-[#e7d3b0] rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full"
                animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/2 -left-8 w-4 h-4 bg-[#bca177] rounded-full"
                animate={{ x: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl w-full max-w-sm md:max-w-2xl lg:max-w-3xl max-h-[80vh] md:max-h-[60vh] overflow-hidden shadow-2xl border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-0">
                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  navigation={true}
                  pagination={{ clickable: true }}
                  className="vanpb-popup-swiper h-[calc(80vh-80px)] md:h-[calc(60vh-80px)]"
                >
                  {vanpbContent.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex items-center justify-center p-4">
                        {item.type === 'image' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="max-w-full max-h-full object-contain rounded-lg"
                            />
                            {item.title && (
                              <h4 className="text-lg font-semibold text-gray-900 mt-4 text-center">
                                {item.title}
                              </h4>
                            )}
                          </div>
                        ) : item.type === 'video' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <div className="aspect-video w-full max-w-2xl bg-gray-100 rounded-xl overflow-hidden">
                              <blockquote
                                className="tiktok-embed"
                                cite={`https://www.tiktok.com/@pb.photobooth/video/${item.videoId}`}
                                data-video-id={item.videoId}
                                style={{ maxWidth: '605px', minWidth: '325px' }}
                              >
                                <section></section>
                              </blockquote>
                            </div>
                            {item.title && (
                              <h4 className="text-lg font-semibold text-gray-900 mt-4 text-center">
                                {item.title}
                              </h4>
                            )}
                            {item.description && (
                              <p className="text-gray-700 mt-2 text-center max-w-md">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 text-center border-t border-white/30">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-[#7c4a1e] hover:bg-[#a67c52] text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 shadow-lg"
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VanpbSection; 