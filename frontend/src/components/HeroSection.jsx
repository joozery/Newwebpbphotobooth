import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { heroSlideService } from '../services/heroSlideService';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  const fetchHeroSlides = async () => {
    try {
      setLoading(true);
      const data = await heroSlideService.getActiveSlides();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
      // Fallback to default images if API fails
      setSlides([
        {
          id: 1,
          image_url: '/src/assets/slidehero/B1.png',
          title: 'Hero Slide 1',
          alt_text: 'PB PhotoBooth Hero Image'
        },
        {
          id: 2,
          image_url: '/src/assets/slidehero/B2.png',
          title: 'Hero Slide 2',
          alt_text: 'PB PhotoBooth Hero Image'
        },
        {
          id: 3,
          image_url: '/src/assets/slidehero/B3.png',
          title: 'Hero Slide 3',
          alt_text: 'PB PhotoBooth Hero Image'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pt-24 md:pt-24 lg:pt-28 pb-16 md:pb-24 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 relative overflow-hidden">
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
          className="absolute top-40 right-20 w-12 h-12 bg-yellow-300/40 rounded-full"
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
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-blue-200/50 rounded-full"
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
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300 rounded-full"
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
          className="absolute top-2/3 left-1/3 w-3 h-3 bg-white rounded-full"
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
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 text-white">
          
          {/* LEFT: Text */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center items-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-2xl sm:text-4xs md:text-5xl font-bold font-prompt drop-shadow-md"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              สร้างสีสันให้งานของคุณ
            </motion.h1>

            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl font-bold font-prompt drop-shadow-md mt-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              สนุกยิ่งขึ้นด้วย
            </motion.h1>
            
            <motion.h2
              className="text-lg sm:text-2xl md:text-6xl font-bold text-yellow-400 mt-4 md:mt-8 drop-shadow-md"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              PB PHOTOBOOTH
            </motion.h2>
            
            <motion.p
              className="mt-2 md:mt-4 text-sm sm:text-base md:text-xl leading-relaxed max-w-lg drop-shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              พบโฟโต้บูธ PB PHOTO BOOTH สร้างสีสัน สร้างรอยยิ้ม ส่งต่อภาพความทรงจำดีๆ ให้ทุกคนที่มางาน บริการด้วยราคาที่เป็นกันเอง รวดเร็วทันใจ ไม่จำกัดปริมาณภาพ งานอีเว้นท์ งานแต่ง พร้อมเจ้าหน้าที่ดูแลตลอดทุกหน้างานของคุณ
            </motion.p>
          </motion.div>

          {/* RIGHT: Slider */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div 
                className="w-full max-w-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {loading ? (
                  <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[560px] flex items-center justify-center bg-white/10 rounded-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                ) : slides.length > 0 ? (
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={20}
                  >
                    {slides.map((slide) => (
                      <SwiperSlide key={slide.id}>
                        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[560px] flex items-center justify-center">
                          <img
                            src={slide.image_url}
                            alt={slide.alt_text || slide.title || 'PB PhotoBooth Hero Image'}
                            className="rounded-xl max-h-full max-w-full object-cover"
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
                  <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[560px] flex items-center justify-center bg-white/10 rounded-xl">
                    <p className="text-white/70 text-center">ไม่มีรูปภาพ Hero Slides</p>
                  </div>
                )}
              </motion.div>
              
              {/* Animated Decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"
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
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full"
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
                className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-200 rounded-full"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
