import React from "react";
import gallery1 from '../assets/gallery/1.jpg';
import gallery2 from '../assets/gallery/2.jpg';
import gallery3 from '../assets/gallery/3.jpg';
import gallery4 from '../assets/gallery/4.jpg';
import gallery5 from '../assets/gallery/5.jpg';
import gallery6 from '../assets/gallery/6.jpg';
import gallery7 from '../assets/gallery/7.jpg';
import gallery8 from '../assets/gallery/8.jpg';

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];

const GallerySection = () => (
  <section className="w-full py-10">
    <div className="max-w-screen-xl mx-auto px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`gallery${i+1}`} className="w-full h-48 object-cover rounded-xl shadow" />
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection; 