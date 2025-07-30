import React, { useEffect } from "react";

const FacebookReviewsSection = () => {
  useEffect(() => {
    // Load Elfsight script if not already loaded
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg--50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">
        <div className="text-center mb-12">
        </div>

        {/* Elfsight Facebook Reviews Widget */}
        <div className="flex justify-center">
          <div 
            className="elfsight-app-8dd208b0-a98e-4930-af1f-cb03e23c65e0 w-full max-w-6xl" 
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  );
};

export default FacebookReviewsSection; 