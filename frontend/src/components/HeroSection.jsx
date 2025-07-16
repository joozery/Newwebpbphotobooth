import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

// รูป background
import bgImage from '../assets/PB PHOTOBOOTH-022.png';

// รูปในสไลด์
import B1 from '../assets/slidehero/B1.png';
import B2 from '../assets/slidehero/B2.png';
import B3 from '../assets/slidehero/B3.png';
import AI from '../assets/slidehero/Ai2.png';
import B4 from '../assets/slidehero/B4.png';
import pb from '../assets/slidehero/2x6-01.png';
import pb2 from '../assets/slidehero/pb2.png';
import pb3 from '../assets/slidehero/PBMemory.png';

const images = [pb, pb2, AI, B1, B2, B3, B4, pb3];

const HeroSection = () => {
  return (
    <section
      className="w-full py-4 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="max-w-screen-xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-white"
        style={{ marginTop: 'clamp(-24px, -6vw, -48px)' }}
      >
        
        {/* LEFT: Text */}
        <div className="flex-1 flex flex-col justify-center items-start pt-6 md:pt-12">
  <motion.h1
    className="text-2xl sm:text-4xl md:text-6xl font-bold font-prompt drop-shadow-md"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    สร้างสีสันให้งาน
  </motion.h1>

  <motion.h1
    className="text-2xl sm:text-4xl md:text-6xl font-bold font-prompt drop-shadow-md mt-1"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.15 }}
  >
    สนุกยิ่งขึ้นด้วย
  </motion.h1>
          
          <motion.h2
            className="text-lg sm:text-2xl md:text-4xl font-bold text-yellow-400 mt-4 md:mt-8 drop-shadow-md"
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
        </div>

        {/* RIGHT: Slider */}
        <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[560px] flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Slide ${index}`}
                    className="rounded-xl max-h-full max-w-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
