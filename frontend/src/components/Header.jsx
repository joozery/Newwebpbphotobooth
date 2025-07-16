import { FaBars } from 'react-icons/fa';

const Header = ({ open, setOpen, menuItems, logo }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-10 h-16 md:h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="PhotoBooth Logo" className="h-10 sm:h-12 md:h-16 w-auto" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-800 font-medium text-sm tracking-wide uppercase hover:text-blue-600 transition duration-200 relative group"
            >
              <span className="group-hover:border-b-2 border-blue-600 pb-1">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition"
          >
            CONTACT US
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition shadow-sm"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="h-5 w-5"
            />
            Facebook
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-lg border border-blue-200 bg-white text-blue-600 shadow hover:bg-blue-50 transition"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <FaBars size={44} className="text-blue-700" />
        </button>
      </div>

    </header>
  );
};

export default Header;
