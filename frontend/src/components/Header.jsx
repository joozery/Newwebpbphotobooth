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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-900 to-blue-600 shadow-md transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="PhotoBooth Logo" className="h-10 md:h-14 w-auto" />
        </div>
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white text-lg font-semibold italic hover:text-yellow-300 transition duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-transparent text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {/* Custom hamburger icon */}
          <div className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-white rounded"></div>
            <div className="w-5 h-0.5 bg-white rounded"></div>
            <div className="w-5 h-0.5 bg-white rounded"></div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
