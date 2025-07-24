import React from "react";
import { motion } from "framer-motion";
import { FaCamera, FaPrint, FaMobile, FaGift } from "react-icons/fa";

const AboutSection = () => (
  <section id="about" className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating Squares */}
      <motion.div 
        className="absolute top-20 left-10 w-12 h-12 bg-blue-100/40 rotate-45"
        animate={{ y: [0, -30, 0], rotate: [45, 225, 405] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-8 h-8 bg-purple-100/40 rotate-45"
        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Triangles */}
      <motion.div 
        className="absolute bottom-20 left-1/4 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-200/50"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Diamonds */}
      <motion.div 
        className="absolute top-1/3 right-1/3 w-6 h-6 bg-green-100/40 rotate-45"
        animate={{ scale: [1, 1.5, 1], rotate: [45, 135, 225, 315, 405] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Hexagons */}
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-pink-100/40"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}
        animate={{ y: [0, -25, 0], rotate: [0, 120, 240, 360] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Stars */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-4 h-4 bg-orange-100/40"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
        }}
        animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 72, 144, 216, 288, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Wave Pattern */}
      <motion.div 
        className="absolute bottom-0 w-full opacity-10"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 1440 120" className="w-full">
          <path fill="rgba(59, 130, 246, 0.1)" d="M0,60L48,50C96,40,192,20,288,25C384,30,480,60,576,65C672,70,768,50,864,45C960,40,1056,50,1152,55C1248,60,1344,60,1392,60L1440,60L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </motion.div>
    </div>

    <div className="max-w-screen-xl mx-auto px-4 md:px-10 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* ซ้าย: Features Grid */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaCamera className="text-blue-500 text-xl" />
                <h4 className="font-semibold text-blue-600">กล้อง Mirrorless</h4>
              </div>
              <p className="text-sm text-gray-600">ภาพคมชัด มีจอทัชสกรีน Live view แบบ Realtime</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaPrint className="text-purple-500 text-xl" />
                <h4 className="font-semibold text-purple-600">ปริ้นท์รูป</h4>
              </div>
              <p className="text-sm text-gray-600">ขนาด 2x6" และ 4x6" (2-4 Actions) ไม่จำกัดจำนวน</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaMobile className="text-amber-600 text-xl" />
                <h4 className="font-semibold text-amber-700">ไฟล์ภาพทันที</h4>
              </div>
              <p className="text-sm text-gray-600">รับไฟล์ภาพทันทีทาง Airdrop หรือ QR Code</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaGift className="text-green-400 text-xl" />
                <h4 className="font-semibold text-green-500">Props ฟรี</h4>
              </div>
              <p className="text-sm text-gray-600">ฟรี ค่าออกแบบกรอบรูปตามเพลต มือปกรกน์ Props ให้เลือกมากมาย</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ขวา: ข้อความ About Us */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
                About Us
              </h2>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                PB PhotoBooth
              </h3>
            </div>
            
            <div className="space-y-4 text-lg md:text-xl leading-relaxed text-gray-700">
              <p>
                สร้างสีสัน สร้างรอยยิ้ม สร้างความประทับใจ ส่งต่อภาพความทรงจำดีๆ ให้กับทุกคนในงาน
              </p>
              <p>
                บริการด้วยราคาที่เป็นกันเอง ราคาไม่แพง ไม่ว่าจะเป็นจัดงานแต่ง งานอีเว้นท์ งานปาร์ตี้ พร้อมเจ้าหน้าที่ดูแลงานบริการตลอดงานของคุณ
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection; 