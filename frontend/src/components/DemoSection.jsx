import { FaPencilAlt } from 'react-icons/fa';

const DemoSection = () => (
  <section className="bg-blue-100 py-6 w-full px-4 md:px-12">
    <div className="flex justify-center items-center">
      <FaPencilAlt className="mr-2 text-black" />
      <a href="https://pbphotobooth.netlify.app/event/11" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-black">DEMO ทดลองเขียนคำอวยพร</a>
    </div>
  </section>
);

export default DemoSection; 