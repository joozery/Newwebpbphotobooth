import { FaBars } from 'react-icons/fa';
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${scrolled ? 'bg-gradient-to-r from-blue-900 to-blue-600 shadow-md' : 'bg-transparent'}`}>
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
          className="md:hidden flex items-center justify-center w-10 h-10 rounded bg-white text-blue-700 shadow hover:bg-blue-100 transition"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <FaBars size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
