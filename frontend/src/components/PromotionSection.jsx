import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import promotionBg from '../assets/Asset28.png';

// รูป slidepromotion
import Pro01 from '../assets/slidepromotion/Pro01.png';
import Pro02 from '../assets/slidepromotion/Pro02.png';
import Pro03 from '../assets/slidepromotion/Pro03.png';

const promotionImages = [Pro01, Pro02, Pro03];

const PromotionSection = () => (
  <section
    className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[700px] bg-cover bg-center bg-no-repeat flex items-center -mt-20 md:-mt-48 relative z-0"
    style={{
      backgroundImage: `url(${promotionBg})`,
    }}
  >
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 w-full">
      <div className="flex items-center">
        {/* Slider รูปด้านซ้าย */}
        <div className="w-1/2 md:w-2/5 flex justify-center">
          <div className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
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
              {promotionImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-[4/3]">
                    <img
                      src={image}
                      alt={`Promotion ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        
        {/* Content ด้านขวา */}
        <div className="w-1/2 md:w-3/5 text-white pl-16 md:pl-32 lg:pl-40 flex flex-col justify-center">
          <div className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            PROMOTION
          </div>
          <div className="text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
            ที่ PB PHOTO BOOTH สร้างสรรค์สำหรับคุณ<br/>
            ประกอบไปด้วย ถ่ายรูปชุดใหญ่ครบครัน พื้นหลังแตกต่าง<br/>
            ประกอบด้วยชุดใหญ่ในแต่ละแพ็ค ราคาพิเศษ ไม่เสียใจถ้าไม่มาพบ<br/>
            กับความสนุก และอีกมากมาย พร้อมด้วยทีมงานมืออาชีพพร้อมให้บริการ
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PromotionSection; 