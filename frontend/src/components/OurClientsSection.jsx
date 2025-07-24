import React, { useState, useEffect } from "react";
import { clientService } from '../services/clientService';

const OurClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getActiveClients();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to empty array if API fails
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {clients.map((client) => (
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