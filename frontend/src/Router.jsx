import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import SocialSidebar from './components/SocialSidebar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetailPage from './components/ProductDetailPage';
import AdminDashboard from './components/AdminDashboard';
import logo from './assets/pblogo.png';

const Router = () => {
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'PACKAGE', href: '#package' },
    { label: 'OUR CLIENTS', href: '#clients' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>PhotoBooth Pro | บริการถ่ายภาพงานแต่ง & อีเว้นท์</title>
        <meta
          name="description"
          content="PhotoBooth Pro บริการถ่ายภาพงานแต่งและอีเว้นท์ พร้อมบูธถ่ายรูปสุดทันสมัย เก็บทุกความประทับใจในวันสำคัญของคุณ"
        />
        <meta
          name="keywords"
          content="photobooth, ถ่ายภาพ, งานแต่ง, อีเว้นท์, บูธถ่ายรูป, AI photobooth, 360 video booth"
        />
        <meta property="og:title" content="PhotoBooth Pro | บริการถ่ายภาพงานแต่ง & อีเว้นท์" />
        <meta
          property="og:description"
          content="PhotoBooth Pro บริการถ่ายภาพงานแต่งและอีเว้นท์ พร้อมบูธถ่ายรูปสุดทันสมัย เก็บทุกความประทับใจในวันสำคัญของคุณ"
        />
        <meta property="og:image" content="/cover.jpg" />
        <meta property="og:url" content="https://pbphotobooth.netlify.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>

      <BrowserRouter>
        {/* Header and Navigation for non-admin pages */}
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={
            <>
              <Header open={open} setOpen={setOpen} menuItems={menuItems} logo={logo} />
              <MobileMenu open={open} setOpen={setOpen} menuItems={menuItems} logo={logo} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
              </Routes>
              <Footer />
              <SocialSidebar />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Router; 