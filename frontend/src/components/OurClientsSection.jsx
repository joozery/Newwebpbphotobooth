import React from "react";
import clients1 from '../assets/clients/clients1.jpg';
import clients2 from '../assets/clients/clients2.jpg';
import clients3 from '../assets/clients/clients3.jpg';
import clients4 from '../assets/clients/clients4.jpg';
import clients5 from '../assets/clients/clients5.jpg';
import clients6 from '../assets/clients/clients6.jpg';
import clients7 from '../assets/clients/clients7.jpg';
import clients8 from '../assets/clients/clients8.jpg';
import clients9 from '../assets/clients/clients9.jpg';
import clients10 from '../assets/clients/clients10.jpg';

const clients = [clients1, clients2, clients3, clients4, clients5, clients6, clients7, clients8, clients9, clients10];

const OurClientsSection = () => (
  <section className="w-full py-10 bg-white">
    <div className="max-w-screen-xl mx-auto px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">OUR CLIENTS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
        {clients.map((logo, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md flex items-center justify-center p-4 transition hover:scale-105 hover:shadow-lg border border-gray-100"
          >
            <img src={logo} alt={`client${i+1}`} className="h-16 object-contain max-w-[120px]" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default OurClientsSection; 