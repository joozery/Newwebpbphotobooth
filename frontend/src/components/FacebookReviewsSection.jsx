import React, { useEffect, useState } from "react";

const FacebookReviewsSection = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    // Clear any existing Facebook widget errors
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    // Load Elfsight script if not already loaded
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Elfsight script loaded successfully');
        setWidgetLoaded(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Elfsight script');
        setWidgetError(true);
      };
      
      document.head.appendChild(script);
    } else {
      setWidgetLoaded(true);
    }

    // Cleanup function
    return () => {
      // Remove any Facebook widget related errors
      if (window.FB) {
        try {
          window.FB.XFBML.parse();
        } catch (error) {
          console.log('Facebook widget cleanup completed');
        }
      }
    };
  }, []);

  // Handle widget errors gracefully
  useEffect(() => {
    const handleError = (event) => {
      if (event.error && event.error.message && event.error.message.includes('Could not find element')) {
        console.log('Facebook widget element not found, retrying...');
        // Retry loading after a short delay
        setTimeout(() => {
          if (window.FB && window.FB.XFBML) {
            try {
              window.FB.XFBML.parse();
            } catch (error) {
              console.log('Facebook widget retry completed');
            }
          }
        }, 1000);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (widgetError) {
    return (
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10">
          <div className="text-center">
            <p className="text-gray-600">Facebook Reviews widget is temporarily unavailable</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-10">
        <div className="text-center mb-12">
        </div>

        {/* Elfsight Facebook Reviews Widget */}
        <div className="flex justify-center">
          <div 
            className="elfsight-app-21dd7c99-d594-4d64-ac07-afb8a1293638 w-full max-w-6xl" 
            data-elfsight-app-lazy
            data-elfsight-app-options='{"lazy": true, "autoInit": false}'
          ></div>
        </div>
        
        {!widgetLoaded && (
          <div className="text-center mt-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">Loading Facebook Reviews...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacebookReviewsSection; 