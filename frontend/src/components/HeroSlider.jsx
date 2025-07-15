import cover from '../assets/coverslide.jpg';

const HeroSlider = () => (
  <section className="relative w-screen max-w-none aspect-[16/4] flex items-center justify-center overflow-hidden overflow-x-hidden mt-20">
    {/* รูปภาพเต็ม slide */}
    <img src={cover} alt="cover slide" className="absolute inset-0 w-full h-full object-cover z-0" />
    {/* overlay มืดนิด ๆ เพื่อให้อ่านข้อความง่าย (ถ้าอยากเก็บไว้) */}
    {/* <div className="absolute inset-0 bg-black/20 z-10" /> */}
    {/* ปุ่มเลื่อนซ้าย */}
    <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-400/60 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md hover:bg-gray-500/80 transition z-20 md:left-4 md:w-12 md:h-12 sm:w-10 sm:h-10 sm:text-xl">
      &#60;
    </button>
    {/* ปุ่มเลื่อนขวา */}
    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-400/60 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md hover:bg-gray-500/80 transition z-20 md:right-4 md:w-12 md:h-12 sm:w-10 sm:h-10 sm:text-xl">
      &#62;
    </button>
  </section>
)

export default HeroSlider 