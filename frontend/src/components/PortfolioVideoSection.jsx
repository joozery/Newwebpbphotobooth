import React, { useEffect, useRef } from "react";
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

const VideoCard = ({ video, index }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Function to start playing video
      const startVideo = async () => {
        try {
          // Set video properties for mobile compatibility
          videoElement.muted = true;
          videoElement.playsInline = true;
          videoElement.loop = true;
          videoElement.preload = "metadata";
          
          // Try to play the video
          await videoElement.play();
        } catch (error) {
          console.log(`Video ${index + 1} autoplay failed:`, error);
          // If autoplay fails, we'll handle it with user interaction
        }
      };

      // Start video when component mounts
      startVideo();

      // Handle visibility changes (for better mobile performance)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          videoElement.pause();
        } else {
          startVideo();
        }
      };

      // Handle intersection observer for better performance
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startVideo();
            } else {
              videoElement.pause();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(videoElement);

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        observer.unobserve(videoElement);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [index]);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-3 flex flex-col items-center">
      <div 
        className="relative w-full aspect-[9/16] rounded-xl border-2 border-red-300 flex items-center justify-center overflow-hidden mb-2 bg-gray-100 cursor-pointer"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          src={video.src}
          className="object-cover w-full h-full"
          preload="metadata"
          controls={false}
          muted
          loop
          playsInline
          poster={undefined}
        />
        {/* Play button overlay for better UX */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-white bg-opacity-90 rounded-full p-2">
            <FaPlay className="text-red-500 text-sm" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-1 mt-1">
        <span className="flex items-center text-xs text-rose-400 font-semibold gap-1">
          <FaRegClock /> {video.duration}
        </span>
        <button className="text-rose-400 bg-white border border-rose-200 rounded-full p-1 hover:bg-rose-50 transition">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

const PortfolioVideoSection = () => (
  <section className="w-full py-10 bg-gray-">
    <div className="max-w-screen-xl mx-auto px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">VDO Portfolio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <VideoCard key={index} video={video} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioVideoSection; 