import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPlus, FaRegClock, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { fetchVideos } from '../services/videoService';

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
    <div className="bg-white rounded-2xl shadow p-3 flex flex-col items-center min-w-[280px]">
      <div 
        className="relative w-full aspect-[9/16] rounded-xl border-2 border-red-300 flex items-center justify-center overflow-hidden mb-2 bg-gray-100 cursor-pointer"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          src={video.video_url}
          className="object-cover w-full h-full"
          preload="metadata"
          controls={false}
          muted
          loop
          playsInline
          poster={video.thumbnail_url || undefined}
        />
      </div>
      <div className="flex items-center justify-between w-full px-1 mt-1">
        <span className="flex items-center text-xs text-rose-400 font-semibold gap-1">
          <FaRegClock /> {video.duration || '0:00'}
        </span>
        <button className="text-rose-400 bg-white border border-rose-200 rounded-full p-1 hover:bg-rose-50 transition">
          <FaPlus />
        </button>
      </div>
      {video.title && (
        <div className="text-center mt-2">
          <h3 className="text-sm font-semibold text-gray-800">{video.title}</h3>
          {video.subtitle && (
            <p className="text-xs text-gray-600">{video.subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
};

const PortfolioVideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Fetch videos from API
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideos();
        // Only show active videos
        const activeVideos = data.filter(video => video.status === 'active');
        setVideos(activeVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
        setVideos([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Calculate how many videos to show based on screen size
  const getVideosToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 3;  // md
      if (window.innerWidth >= 640) return 2;  // sm
      return 1; // mobile
    }
    return 4; // default
  };

  const videosToShow = getVideosToShow();
  const maxSlides = Math.max(0, videos.length - videosToShow);

  const goToPrevious = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide(prev => Math.min(maxSlides, prev + 1));
  };

  // Update arrow visibility - always show arrows for better UX
  useEffect(() => {
    setShowLeftArrow(true);
    setShowRightArrow(true);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newVideosToShow = getVideosToShow();
      const newMaxSlides = Math.max(0, videos.length - newVideosToShow);
      setCurrentSlide(prev => Math.min(prev, newMaxSlides));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [videos.length]);

  if (loading) {
    return (
      <section className="w-full py-10 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">VDO Portfolio</h2>
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-red-500" />
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="w-full py-10 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">VDO Portfolio</h2>
          <div className="text-center py-20 text-gray-500">
            <p>ยังไม่มีวิดีโอใน Portfolio</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">VDO Portfolio</h2>
        
        <div className="relative px-16">
          {/* Left Arrow - Always visible */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-2 border-red-600 transition-all duration-300 hover:shadow-2xl hover:scale-110"
            style={{ zIndex: 9999 }}
          >
            <FaChevronLeft className="text-2xl" />
          </button>

          {/* Right Arrow - Always visible */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-2 border-red-600 transition-all duration-300 hover:shadow-2xl hover:scale-110"
            style={{ zIndex: 9999 }}
          >
            <FaChevronRight className="text-2xl" />
          </button>

          {/* Video Container */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / videosToShow)}%)`,
                width: `${(videos.length / videosToShow) * 100}%`
              }}
            >
              {videos.map((video, index) => (
                <div 
                  key={video.id} 
                  className="flex-shrink-0"
                  style={{ width: `${100 / videos.length}%` }}
                >
                  <VideoCard video={video} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {maxSlides > 0 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxSlides + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-red-400 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioVideoSection; 