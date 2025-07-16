import blessImg from '../assets/bless.jpg';

const AboutSection = () => (
  <section id="about" className="w-full my-16 flex flex-col md:flex-row items-center gap-8 px-4 md:px-12 bg-blue-50 rounded-3xl shadow-lg py-10">
    {/* ซ้าย: ข้อความ */}
    <div className="flex-1">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-3">เขียนอวยพรออนไลน์</h2>
      <p className="text-black mb-4 text-lg">
        ส่งความรู้สึกดี ๆ ถึงคู่บ่าวสาวผ่านฟีเจอร์ “เขียนอวยพรออนไลน์”<br/>
        กรอกชื่อและข้อความอวยพรของคุณ ระบบจะส่งถึงเจ้าของงานอย่างอบอุ่นและทันสมัย
      </p>
      <ul className="list-disc list-inside text-black mb-6 text-base">
        <li>ใช้งานง่ายผ่านมือถือหรือคอมพิวเตอร์</li>
        <li>ข้อความอวยพรจะถูกจัดเก็บอย่างปลอดภัย</li>
        <li>เจ้าของงานสามารถอ่านและแชร์คำอวยพรได้ทุกเมื่อ</li>
      </ul>
      <a href="#" className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition text-lg">เขียนอวยพร</a>
    </div>
    {/* ขวา: รูปภาพ (ไม่มีข้อความซ้อน) */}
    <div className="flex-1 flex justify-center">
      <img
        src={blessImg}
        alt="หนังสืออวยพร"
        className="w-[400px] max-w-full rounded-2xl shadow-xl border-4 border-blue-100"
      />
    </div>
  </section>
);

export default AboutSection; 