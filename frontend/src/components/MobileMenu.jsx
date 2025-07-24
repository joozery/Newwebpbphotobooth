import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function MobileMenu({ open, setOpen, menuItems, logo }) {
  const scrollToSection = (sectionId) => {
    // ถ้าอยู่ในหน้า ProductDetailPage และคลิก HOME ให้กลับไปหน้าแรก
    if (sectionId === 'hero' && window.location.pathname !== '/') {
      window.location.href = '/';
      setOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth >= 1024 ? 96 : window.innerWidth >= 768 ? 88 : 80; // Responsive header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-[2147483647]" style={{position:'fixed',zIndex:2147483647}} onClick={() => setOpen(false)} />
      )}
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-11/12 max-w-xs bg-white z-[2147483647] shadow-2xl transition-transform duration-300 ease-in-out transform overflow-y-auto ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{position:'fixed',zIndex:2147483647}}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
          <img src={logo} alt="Logo" className="h-8 sm:h-10" />
          <button onClick={() => setOpen(false)} className="text-3xl text-gray-700 hover:text-red-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
            <FaTimes size={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-4 pt-6 pb-8">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-gray-800 font-medium text-lg py-3 rounded hover:text-blue-600 hover:bg-blue-50 transition text-center bg-transparent border-none cursor-pointer w-full"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-4 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition text-center text-lg border-none cursor-pointer"
          >
            CONTACT US
          </button>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium hover:bg-blue-100 transition mt-2 text-lg"
            onClick={() => setOpen(false)}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-5 w-5"
            />
            Facebook
          </a>
        </nav>
      </div>
    </>
  );
} 