import React from "react";
import { FaFacebookF, FaInstagram, FaLine, FaPhone, FaTiktok } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";

const icons = [
  { icon: <FaLine />, link: "https://lin.ee/DEu9Lhh", color: "#06C755", hover: "#b2f2d7" },
  { icon: <FaFacebookF />, link: "https://facebook.com/", color: "#1877F3", hover: "#dbeafe" },
  { icon: <BsMessenger />, link: "https://m.me/2137021833290518", color: "#00B2FF", hover: "#bae6fd" },
  { icon: <FaTiktok />, link: "https://www.tiktok.com/@pb.photobooth", color: "#000000", hover: "#e0e0e0" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/pb.photobooth/", color: "#E4405F", hover: "#fbcfe8" },
  { icon: <FaPhone />, link: "tel:0969626465", color: "#10B981", hover: "#bbf7d0" },
];

const SocialSidebar = () => (
  <div
    style={{
      position: "fixed",
      top: "40%",
      right: 0,
      transform: "translateY(-50%)",
      background: "rgba(30,30,30,0.25)",
      borderRadius: "20px 0 0 20px",
      padding: "12px 6px",
      zIndex: 1000,
      boxShadow: "-2px 0 8px rgba(0,0,0,0.08)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    }}
  >
    {icons.map((item, idx) => (
      <a
        key={idx}
        href={item.link}
        target={item.link.startsWith('tel:') ? undefined : "_blank"}
        rel={item.link.startsWith('tel:') ? undefined : "noopener noreferrer"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          margin: "10px 0",
          background: "#fff",
          borderRadius: "50%",
          color: item.color,
          fontSize: 22,
          transition: "background 0.2s, color 0.2s",
          textDecoration: "none",
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = item.hover;
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = "#fff";
        }}
      >
        {item.icon}
      </a>
    ))}
  </div>
);

export default SocialSidebar; 