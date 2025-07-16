import aiphotoImg from '../assets/slidehero/Ai2.png';
import video360Img from '../assets/slidehero/pb2.png';
import photoboothImg from '../assets/slidehero/pb.png';
import blessImg from '../assets/slidehero/PBMemory.png';

function ProductCard({ img, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-2xl transition flex flex-col border">
      <img src={img} alt={title} className="w-full h-40 object-contain bg-white rounded-t-xl" />
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="font-semibold text-lg mb-1 text-black">{title}</div>
        <div className="text-black text-sm text-center mb-4">{desc}</div>
        <button className="mt-auto text-blue-500 underline bg-blue-50 rounded px-4 py-1 font-medium transition">
          ดูรายละเอียด
        </button>
      </div>
    </div>
  );
}

const ProductSection = () => (
  <section id="portfolio" className="w-full py-10">
    <div className="max-w-screen-xl mx-auto px-4 md:px-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-black">รวมสินค้าและบริการ</h2>
          <p className="text-black text-sm mt-1">ค้นหาสินค้าและบริการถ่ายภาพงานแต่งที่เหมาะกับคุณ</p>
        </div>
        <button className="border border-gray-300 rounded px-4 py-1 text-black hover:bg-gray-100 transition">ดูทั้งหมด</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ProductCard img={aiphotoImg} title="AI Photobooth" desc="ถ่ายภาพด้วย AI สร้างประสบการณ์ใหม่ในงานแต่ง" />
        <ProductCard img={video360Img} title="360 Video Booth" desc="บูธวิดีโอ 360 องศา เก็บทุกโมเมนต์ประทับใจ" />
        <ProductCard img={photoboothImg} title="PhotoBooth" desc="บูธถ่ายภาพสุดคลาสสิกสำหรับทุกงานแต่ง" />
        <ProductCard img={blessImg} title={<span className="text-black">เขียนอวยพรออนไลน์</span>} desc={<span className="text-black">ส่งคำอวยพรออนไลน์ถึงคู่บ่าวสาวได้ง่าย ๆ</span>} />
      </div>
    </div>
  </section>
);

export default ProductSection; 