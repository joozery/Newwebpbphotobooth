import React from "react";
import { FaPlay, FaPlus, FaRegClock } from 'react-icons/fa';
import uobVideo from '../assets/video/uob.mp4';
import charleskeithVideo from '../assets/video/charleskeith.mp4';
import thespfpartyVideo from '../assets/video/thespfparty.mp4';
import runingVideo from '../assets/video/runing.mp4';

const videos = [
  { src: uobVideo, title: "photowish ใน 3 นาที", duration: "2:27" },
  { src: charleskeithVideo, title: "Sabuy Wedding 2024", duration: "0:37" },
  { src: thespfpartyVideo, title: "รีวิวจากลูกค้า", duration: "1:02" },
  { src: runingVideo, title: "Books Tour", duration: "0:30" },
];

const PortfolioVideoSection = () => (
  <section className="w-full py-10 bg-gray-">
    <div className="max-w-screen-xl mx-auto px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">VDO Portfolio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {videos.map((v, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-3 flex flex-col items-center">
            <div className="relative w-full aspect-[9/16] rounded-xl border-2 border-red-300 flex items-center justify-center overflow-hidden mb-2 bg-gray-100">
              <video
                src={v.src}
                className="object-cover w-full h-full"
                preload="metadata"
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                poster={undefined}
              />
            </div>
            <div className="flex items-center justify-between w-full px-1 mt-1">
              <span className="flex items-center text-xs text-rose-400 font-semibold gap-1">
                <FaRegClock /> {v.duration}
              </span>
              <button className="text-rose-400 bg-white border border-rose-200 rounded-full p-1 hover:bg-rose-50 transition">
                <FaPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioVideoSection; 