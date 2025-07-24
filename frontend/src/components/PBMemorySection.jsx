import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PBMemoryImg from '../assets/slidehero/PBMemory.png';

const PBMemorySection = () => {
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 bg-yellow-400/30 rounded-full"
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
          className="absolute top-40 right-20 w-12 h-12 bg-white/20 rounded-full"
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
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-pink-300/40 rounded-full"
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
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* รูปด้านซ้าย */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* รูปหลัก */}
              <motion.div 
                className="w-full max-w-md aspect-[4/3] rounded-2xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={PBMemoryImg}
                  alt="PB Memory Mobile App"
                  className="w-full h-full object-contain rounded-lg"
                />
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
                className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-300 rounded-full"
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2">
                  PB MEMORY
                </h2>
              </div>

              {/* รายละเอียด */}
              <div className="space-y-3 text-base md:text-lg leading-relaxed">
                <p>
                  งานแต่งงาน, แฟนมีตติ้งสบาน, เลี้ยงส่งสรรค์
                </p>
                <p>
                  งานอีเวิ้นต์ที่ปรับความรู้แบบของคุณได้
                </p>
                <p>
                  เขียนอวยพร ออนไลน์ ที่สามารถให้กับงานออกแบบ
                </p>
                <p>
                  ไปตามริบนงาน เพียงให้เขาทำกิจกรรมงาน สแกน QR Code
                </p>
                <p>
                  ที่สามารถส่งข้อความหรือเขียนอวยพร พร้อมปรับ
                </p>
                <p>
                  เก็บไว้เป็น แกลลอรี่การดูอวยพร
                </p>
              </div>

              {/* ปุ่ม CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setShowVideoPopup(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <span>สาธิตการใช้งาน</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
                
                <button 
                  onClick={() => window.open('https://pbphotobooth.netlify.app/event/11', '_blank')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-700 font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <span>ทดลองใช้งาน</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Demo Popup */}
      <AnimatePresence>
        {showVideoPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideoPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/20">
                <h3 className="text-2xl font-bold text-gray-900">สาธิตการใช้งาน PB Memory</h3>
                <button 
                  onClick={() => setShowVideoPopup(false)}
                  className="text-gray-700 hover:text-gray-900 text-2xl p-2 hover:bg-gray-100 rounded-full transition"
                >
                  ✕
                </button>
              </div>

              {/* Video Content */}
              <div className="p-6">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="PB Memory Demo"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Description */}
                <div className="mt-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">PB Memory Mobile App</h4>
                  <p className="text-gray-700 leading-relaxed">
                    ดูวิธีการใช้งานแอปพลิเคชัน PB Memory สำหรับงานอีเวนต์ 
                    ระบบเขียนอวยพรออนไลน์ที่สามารถปรับแต่งได้ตามธีมงาน
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PBMemorySection; 