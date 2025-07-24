import { FaBars, FaHamburger } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import logo from '../assets/asset4.png'; // ✅ เปลี่ยนชื่อไฟล์ให้ไม่มีช่องว่าง

const Header = ({ open, setOpen, menuItems }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // ถ้าอยู่ในหน้า ProductDetailPage และคลิก HOME ให้กลับไปหน้าแรก
    if (sectionId === 'hero' && window.location.pathname !== '/') {
      window.location.href = '/';
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
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600 shadow-md transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10 h-20 md:h-22 lg:h-24">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="PhotoBooth Logo" className="h-12 md:h-14 lg:h-16 w-auto" />
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-white text-lg md:text-lg font-semibold italic hover:text-yellow-300 transition duration-200 bg-transparent border-none cursor-pointer whitespace-nowrap px-1"
            >
              {item.label}
            </button>
          ))}
        </nav>
        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-transparent text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {/* Custom hamburger icon */}
          <div className="flex flex-col gap-1">
            <div className="w-6 h-0.5 bg-white rounded"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
