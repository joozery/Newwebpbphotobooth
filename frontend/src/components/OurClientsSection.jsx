import React, { useState, useEffect } from "react";
import { clientService } from '../services/clientService';

const OurClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (clients.length > 10) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients.length / 10));
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [clients.length]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getActiveClients();
      console.log('Fetched clients:', data); // Debug log
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to empty array if API fails
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  // Split clients into groups of 10 (2 rows x 5 columns)
  const getClientsForSlide = () => {
    const startIndex = currentSlide * 10;
    return clients.slice(startIndex, startIndex + 10);
  };

  // Split clients into 2 rows
  const getClientsRows = () => {
    const slideClients = getClientsForSlide();
    const firstRow = slideClients.slice(0, 5);
    const secondRow = slideClients.slice(5, 10);
    return { firstRow, secondRow };
  };

  // Get total number of slides needed
  const totalSlides = Math.ceil(clients.length / 10);

  if (loading) {
    return (
      <section className="w-full py-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">OUR CLIENTS</h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">OUR CLIENTS</h2>
        {clients.length > 0 ? (
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIndex = slideIndex * 10;
                const slideClients = clients.slice(startIndex, startIndex + 10);
                const firstRow = slideClients.slice(0, 5);
                const secondRow = slideClients.slice(5, 10);

                return (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="space-y-8">
                      {/* First Row */}
                      <div className="grid grid-cols-5 gap-8 items-center">
                        {firstRow.map((client) => (
                          <div
                            key={client.id}
                            className="bg-white rounded-2xl shadow-md flex items-center justify-center p-4 transition hover:scale-105 hover:shadow-lg border border-gray-100"
                          >
                            <img 
                              src={client.logo_url} 
                              alt={client.alt_text || client.name} 
                              className="h-16 object-contain max-w-[120px]"
                              onError={(e) => {
                                console.error('Error loading client logo:', client.logo_url);
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        ))}
                        {/* Fill empty spaces if less than 5 clients in first row */}
                        {Array.from({ length: Math.max(0, 5 - firstRow.length) }).map((_, index) => (
                          <div key={`empty-first-${index}`} className="bg-transparent" />
                        ))}
                      </div>
                      
                      {/* Second Row */}
                      <div className="grid grid-cols-5 gap-8 items-center">
                        {secondRow.map((client) => (
                          <div
                            key={client.id}
                            className="bg-white rounded-2xl shadow-md flex items-center justify-center p-4 transition hover:scale-105 hover:shadow-lg border border-gray-100"
                          >
                            <img 
                              src={client.logo_url} 
                              alt={client.alt_text || client.name} 
                              className="h-16 object-contain max-w-[120px]"
                              onError={(e) => {
                                console.error('Error loading client logo:', client.logo_url);
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        ))}
                        {/* Fill empty spaces if less than 5 clients in second row */}
                        {Array.from({ length: Math.max(0, 5 - secondRow.length) }).map((_, index) => (
                          <div key={`empty-second-${index}`} className="bg-transparent" />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Debug info */}
            <div className="text-center mt-4 text-sm text-gray-500">
              แสดงลูกค้าทั้งหมด {clients.length} รายการ ใน {totalSlides} slide
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">ไม่มีข้อมูลลูกค้า</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurClientsSection; 