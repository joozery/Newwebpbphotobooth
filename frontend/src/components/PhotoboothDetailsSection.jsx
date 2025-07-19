import React from "react";

const PhotoboothDetailsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">


        <div className="bg-gradient-to-br from-blue-400/20 via-yellow-300/20 to-purple-500/20 backdrop-blur-md border border-white/30 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="text-gray-800 leading-relaxed text-center">
            <p className="text-lg md:text-xl leading-8 font-medium">
              ถ่ายและปริ้นท์รูปขนาค 2x6" และ 4x6" (2-4 Actions) ไม่จำกัดจำนวน<br/>
              รับไฟล์ภาพทันทีทาง Airdrop หรือ QR Code พร้อมไฟล์วิดีโอตุ๊กตึกแบบ GIF<br/>
              ถ่ายด้วยกล้อง Mirrorless ภาพคมชัด มีจอทัชสกรีu Live view แบบ Realtime<br/>
              ฟรี ค่าออกแบบกรอบรูปตามเพลต มือปกรกน์ Props ให้เลือกมากมาย<br/>
              ทีมงานดูแลซัพพอร์ตตลอดเวลา
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoboothDetailsSection; 