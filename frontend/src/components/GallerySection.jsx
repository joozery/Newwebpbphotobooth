import React, { useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGalleryImages } from '../services/galleryService';

// Lightbox Modal Component
const LightboxModal = ({ isOpen, onClose, currentImage, onPrevious, onNext, totalImages, currentIndex }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999] p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg border-2 border-white"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          ✕
        </button>

        {/* Previous Button - Left Center */}
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[10000] bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg border-2 border-white"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          ‹
        </button>

        {/* Next Button - Right Center */}
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[10000] bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg border-2 border-white"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          ›
        </button>

        {/* Image Container */}
        <div className="relative max-w-4xl max-h-full">
          <img
            src={currentImage.image_url}
            alt={`Gallery image ${currentImage.id}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            style={{ maxHeight: '80vh' }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>

        {/* Image Counter - Bottom Center */}
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[10000] bg-black text-white px-4 py-2 rounded-full shadow-lg border border-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <span className="text-lg font-bold">
            {currentIndex + 1} / {totalImages}
          </span>
        </div>

        {/* Click outside to close */}
        <div 
          className="absolute inset-0 z-[9998]" 
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        ></div>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 8;

  // Fetch gallery images from API
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await fetchGalleryImages();
        // Only show active images
        const activeImages = data.filter(image => image.status === 'active');
        setImages(activeImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
        setImages([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = currentPage * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(startIndex + index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  if (loading) {
    return (
      <section className="w-full py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Gallery</h2>
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-red-500" />
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="w-full py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Gallery</h2>
          <div className="text-center py-20 text-gray-500">
            <p>ยังไม่มีรูปภาพในแกลลอรี่</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full py-10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Gallery</h2>
          
          {/* Gallery Grid */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
              >
                {currentImages.map((image, index) => (
                  <motion.div
                    key={`${currentPage}-${image.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.image_url}
                      alt={`Gallery image ${image.id}`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <div className="text-lg font-semibold mb-2">คลิกเพื่อดู</div>
                        <div className="text-sm">รูปภาพ {image.id}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={goToPreviousPage}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg transition-colors duration-300"
                  disabled={totalPages <= 1}
                >
                  <FaChevronLeft />
                </button>
                
                {/* Page Indicator */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === currentPage 
                          ? 'bg-blue-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={goToNextPage}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg transition-colors duration-300"
                  disabled={totalPages <= 1}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <div className="text-center mt-4 text-gray-600">
                หน้า {currentPage + 1} จาก {totalPages} ({images.length} รูปทั้งหมด)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {images.length > 0 && (
        <LightboxModal
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          currentImage={images[currentImageIndex]}
          onPrevious={goToPrevious}
          onNext={goToNext}
          totalImages={images.length}
          currentIndex={currentImageIndex}
        />
      )}
    </>
  );
};

export default GallerySection; 