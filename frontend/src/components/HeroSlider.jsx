import photoboothImg from '../assets/photobooth.jpg';

const HeroSlider = () => (
  <section className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden pt-24 pb-0 bg-gradient-to-br from-[#0a3d62] to-[#2980b9]">
    {/* ลวดลาย diagonal */}
    <div className="absolute inset-0 z-0" style={{background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 16px, transparent 16px 32px)'}}></div>
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-0">
      {/* Left: Text */}
      <div className="flex-1 text-white py-8 pl-12">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">สร้างสีสันให้งาน<br/>สนุกยิ่งขึ้นด้วย</h1>
        <div className="text-2xl md:text-4xl font-extrabold mb-4 text-yellow-400 tracking-wide">PB PHOTOBOOTH</div>
        <p className="text-base md:text-lg text-white/90 max-w-xl mb-6">
          พี่โฟโต้บูธ PB PHOTO BOOTH สร้างสีสัน สร้างรอยยิ้ม<br />สร้างความประทับใจ ส่งต่อภาพความทรงจำดีๆ ให้ทุกคนในงาน<br />บริการด้วยราคาที่เป็นกันเอง ราคาไม่แพง ไม่ว่าจะเป็นจัดงานแต่ง งานอีเว้นท์ งานบริษัท พร้อมเจ้าหน้าที่ดูแลงานบริการตลอดงานของคุณ
        </p>
      </div>
      {/* Right: Mockup Image + กล่องเรขาคณิต */}
      <div className="flex-1 flex items-center justify-center relative min-h-[340px] pr-12">
        <div className="absolute top-10 right-10 w-48 h-64 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-3xl opacity-70 z-0"></div>
        <div className="absolute top-20 right-0 w-48 h-64 bg-gradient-to-br from-purple-400 to-green-400 rounded-3xl opacity-50 z-0"></div>
        <img src={photoboothImg} alt="photobooth" className="relative z-10 w-60 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white" />
      </div>
    </div>
    {/* เส้นโค้งแดงด้านล่าง */}
    <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 w-full h-[80px] z-20"><path fill="#fff" stroke="#eb2f06" strokeWidth="4" d="M0,80 C360,160 1080,0 1440,80 L1440,120 L0,120 Z" /></svg>
  </section>
);

export default HeroSlider; 