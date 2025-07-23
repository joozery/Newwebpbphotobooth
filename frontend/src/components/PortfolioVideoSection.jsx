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
    <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col items-center min-w-[280px] sm:min-w-[320px] md:min-w-[280px] lg:min-w-[260px] xl:min-w-[280px]">
      <div 
        className="relative w-full aspect-[9/16] rounded-xl border-2 border-red-300 flex items-center justify-center overflow-hidden mb-2 bg-gray-100 cursor-pointer hover:shadow-md transition-shadow"
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
        {/* Play overlay for mobile */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20">
          <FaPlay className="text-white text-2xl" />
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-1 mt-1">
        <span className="flex items-center text-xs text-rose-400 font-semibold gap-1">
          <FaRegClock /> {video.duration || '0:00'}
        </span>
        <button className="text-rose-400 bg-white border border-rose-200 rounded-full p-1 hover:bg-rose-50 transition-colors">
          <FaPlus className="text-xs" />
        </button>
      </div>
      {video.title && (
        <div className="text-center mt-2 w-full">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{video.title}</h3>
          {video.subtitle && (
            <p className="text-xs text-gray-600 truncate">{video.subtitle}</p>
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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
      if (window.innerWidth >= 1280) return 4; // xl
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2;  // md
      if (window.innerWidth >= 640) return 1;  // sm
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

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30; // ลดระยะ swipe ให้ง่ายขึ้น
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Add haptic feedback for mobile
  const handleNavigation = (direction) => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    if (direction === 'next') {
      goToNext();
    } else {
      goToPrevious();
    }
  };

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
      <section className="w-full py-8 sm:py-10 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 text-center sm:text-left">VDO Portfolio</h2>
          <div className="flex items-center justify-center py-16 sm:py-20">
            <FaSpinner className="animate-spin text-3xl sm:text-4xl text-red-500" />
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="w-full py-8 sm:py-10 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 text-center sm:text-left">VDO Portfolio</h2>
          <div className="text-center py-16 sm:py-20 text-gray-500">
            <p className="text-sm sm:text-base">ยังไม่มีวิดีโอใน Portfolio</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 sm:py-10 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 text-center sm:text-left">VDO Portfolio</h2>
        
        <div className="relative">
          {/* Mobile: Full width container */}
          <div className="sm:hidden relative px-4">
            {/* Left Arrow - Mobile */}
            {currentSlide > 0 && (
              <button
                onClick={() => handleNavigation('prev')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-red-600 transition-all duration-300 active:scale-95"
                aria-label="Previous video"
              >
                <FaChevronLeft className="text-lg" />
              </button>
            )}

            {/* Right Arrow - Mobile */}
            {currentSlide < maxSlides && (
              <button
                onClick={() => handleNavigation('next')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-red-600 transition-all duration-300 active:scale-95"
                aria-label="Next video"
              >
                <FaChevronRight className="text-lg" />
              </button>
            )}

            {/* Video Container - Mobile */}
            <div 
              className="overflow-hidden relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Swipe hint for mobile */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full opacity-75">
                เลื่อนซ้าย-ขวาเพื่อดูวิดีโอ
              </div>
              
              <div 
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: `${videos.length * 100}%`
                }}
              >
                {videos.map((video, index) => (
                  <div 
                    key={video.id} 
                    className="flex-shrink-0 w-full"
                    style={{ width: `${100 / videos.length}%` }}
                  >
                    <VideoCard video={video} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Progress Indicator */}
            <div className="flex justify-center mt-4 space-x-1">
              {videos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-red-500 flex-1' 
                      : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Centered container with arrows */}
          <div className="hidden sm:block relative px-16">
            {/* Left Arrow - Desktop */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center shadow-xl border-2 border-red-600 transition-all duration-300 hover:shadow-2xl hover:scale-110"
            >
              <FaChevronLeft className="text-xl lg:text-2xl" />
            </button>

            {/* Right Arrow - Desktop */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center shadow-xl border-2 border-red-600 transition-all duration-300 hover:shadow-2xl hover:scale-110"
            >
              <FaChevronRight className="text-xl lg:text-2xl" />
            </button>

            {/* Video Container - Desktop */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-4 lg:gap-6 transition-transform duration-500 ease-in-out"
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
          </div>

          {/* Dots Indicator - Mobile */}
          {maxSlides > 0 && (
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {Array.from({ length: maxSlides + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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