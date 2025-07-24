import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { promotionSlideService } from '../services/promotionSlideService';

const PromotionSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotionSlides();
  }, []);

  const fetchPromotionSlides = async () => {
    try {
      setLoading(true);
      const data = await promotionSlideService.getActiveSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching promotion slides:', error);
      // Fallback to default images if API fails
      setSlides([
        {
          id: 1,
          image_url: '/src/assets/slidepromotion/Pro01.png',
          title: 'Promotion 1',
          alt_text: 'PB PhotoBooth Promotion'
        },
        {
          id: 2,
          image_url: '/src/assets/slidepromotion/Pro02.png',
          title: 'Promotion 2',
          alt_text: 'PB PhotoBooth Promotion'
        },
        {
          id: 3,
          image_url: '/src/assets/slidepromotion/Pro03.png',
          title: 'Promotion 3',
          alt_text: 'PB PhotoBooth Promotion'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 bg-white/30 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-12 h-12 bg-orange-200/40 rounded-full"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-yellow-200/50 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Wave decoration */}
        <motion.div 
          className="absolute bottom-0 w-full opacity-20"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 1440 320" className="w-full">
            <path fill="rgba(255,255,255,0.1)" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,165.3C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </motion.div>

        {/* Sparkle effects */}
        <motion.div 
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/3 w-3 h-3 bg-orange-200 rounded-full"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            delay: 0.5
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Slider รูปด้านซ้าย */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Slider หลัก */}
              <motion.div 
                className="w-full max-w-md aspect-[4/3] rounded-2xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                ) : slides.length > 0 ? (
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    loop={true}
                    className="rounded-lg overflow-hidden"
                  >
                    {slides.map((slide) => (
                      <SwiperSlide key={slide.id}>
                        <div className="aspect-[4/3]">
                          <img
                            src={slide.image_url}
                            alt={slide.alt_text || slide.title || 'PB PhotoBooth Promotion'}
                            className="w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                              console.error('Error loading image:', slide.image_url);
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-lg">
                    <p className="text-white/70 text-center">ไม่มีรูปภาพ Promotion</p>
                  </div>
                )}
              </motion.div>
              
              {/* Animated Decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-200 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Additional floating elements */}
              <motion.div 
                className="absolute top-1/2 -left-8 w-4 h-4 bg-yellow-200 rounded-full"
                animate={{ 
                  x: [0, 20, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* เนื้อหาด้านขวา */}
          <motion.div 
            className="w-full lg:w-1/2 text-white"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {/* หัวข้อ */}
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2">
                  PROMOTION
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  ข้อเสนอพิเศษสำหรับคุณ
                </h3>
              </div>

              {/* รายละเอียด */}
              <div className="space-y-3 text-base md:text-lg leading-relaxed">
                <p>
                 โปรดี โปรเด็ด เฉพาะช่วงเวลานี้เท่านั้น!
                </p>
                <p>
                  จองง่าย ได้ส่วนลด จัดเต็มทุกความประทับใจ
                </p>
                <p>
                  ให้ทุกงานของคุณสนุกสุด ยิ้มไม่หุบ กับ PB PHOTO BOOTH
                </p>
              </div>

              {/* ปุ่ม CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setShowPopup(true)}
                  className="bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <span>ดูโปรโมชั่น</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                
                <a 
                  href="https://line.me/ti/p/@pbphotobooth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <span>ติดต่อเรา</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Promotion Popup */}
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
              className="bg-white/30 backdrop-blur-lg rounded-2xl w-full max-w-sm md:max-w-2xl lg:max-w-3xl max-h-[80vh] md:max-h-[60vh] overflow-hidden shadow-2xl border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Slider Content */}
              <div className="p-0">
                {slides.length > 0 ? (
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
                    className="promotion-popup-swiper h-[calc(80vh-80px)] md:h-[calc(60vh-80px)]"
                  >
                    {slides.map((slide) => (
                      <SwiperSlide key={slide.id}>
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <img
                            src={slide.image_url}
                            alt={slide.alt_text || slide.title || 'PB PhotoBooth Promotion'}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onError={(e) => {
                              console.error('Error loading image:', slide.image_url);
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <p className="text-gray-500 text-center">ไม่มีรูปภาพ Promotion</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-white/20 backdrop-blur-sm p-4 text-center border-t border-white/30">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 shadow-lg"
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

export default PromotionSection; 