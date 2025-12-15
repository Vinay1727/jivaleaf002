import React, { useState, useEffect, useRef } from "react";

// Import images from ExploreOurScrolling/IndoorPlants folder
import Indoor1 from "../../ExploreOurScrolling/IndoorPlants/Indoor1.jpg";
import Indoor2 from "../../ExploreOurScrolling/IndoorPlants/Indoor2.jpg";
import Indoor3 from "../../ExploreOurScrolling/IndoorPlants/Indoor3.jpg";
import Indoor4 from "../../ExploreOurScrolling/IndoorPlants/Indoor4.jpg";
import Indoor5 from "../../ExploreOurScrolling/IndoorPlants/Indoor5.jpg";

const IMAGES = [
  { id: 1, src: Indoor1, name: "Indoor Scene 1" },
  { id: 2, src: Indoor2, name: "Indoor Scene 2" },
  { id: 3, src: Indoor3, name: "Indoor Scene 3" },
  { id: 4, src: Indoor4, name: "Indoor Scene 4" },
  { id: 5, src: Indoor5, name: "Indoor Scene 5" },
];

const ExploreOurScrolling = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollTimerRef = useRef(null);

  // Auto-scroll carousel
  useEffect(() => {
    autoScrollTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoScrollTimerRef.current);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Reset timer when manually clicking
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
      }, 5000);
    }
  };

  const goToPrev = () => {
    goToSlide((currentIndex - 1 + IMAGES.length) % IMAGES.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % IMAGES.length);
  };

  return (
    <section className="px-0 py-8 md:py-16 bg-gradient-to-b from-transparent to-green-950/10">
      <div className="max-w-full mx-auto px-4 md:px-8">
        <h2 className="text-center text-2xl md:text-5xl font-bold mb-6 md:mb-12">
          🌿 Explore Our Indoor Collections
        </h2>

        {/* Main Carousel Container */}
        <div className="relative bg-gradient-to-br from-green-900/40 to-black/50 border border-green-700 rounded-xl md:rounded-3xl overflow-hidden shadow-2xl">
          {/* Main Image Display - Fixed Aspect Ratio */}
          <div className="relative w-full pt-[66.67%]"> {/* 3:2 aspect ratio */}
            <div className="absolute inset-0">
              {IMAGES.map((image, idx) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Previous Button */}
            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all transform hover:scale-110"
              aria-label="Previous image"
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all transform hover:scale-110"
              aria-label="Next image"
            >
              ❯
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 z-20 bg-black/60 px-2 py-1 md:px-4 md:py-2 rounded-lg text-white font-semibold text-xs md:text-sm">
              {currentIndex + 1} / {IMAGES.length}
            </div>
          </div>

          {/* Dot Controls */}
          <div className="bg-black/30 px-4 md:px-8 py-2 md:py-4 flex justify-center gap-2 flex-wrap">
            {IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? "bg-green-400 w-6 md:w-8"
                    : "bg-gray-500 w-2 md:w-3 hover:bg-green-300"
                  }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Strip */}
          <div className="bg-black/50 px-4 py-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 md:gap-3 pb-2">
              {IMAGES.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-lg border-2 overflow-hidden transition-all duration-200 ${idx === currentIndex
                      ? "border-green-400 ring-2 ring-green-400 scale-105"
                      : "border-gray-600 hover:border-green-500 opacity-70 hover:opacity-100"
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section Below Carousel - Compact on Mobile */}
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 px-4 py-4 md:px-8 md:py-6 border-t border-green-700/50">
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              <div className="text-center">
                <p className="text-xl md:text-3xl mb-1 md:mb-2">🌱</p>
                <h3 className="text-[10px] md:text-lg font-bold mb-0.5 md:mb-1">Fresh Plants</h3>
                <p className="text-gray-300 text-[8px] md:text-sm">Authentic</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-3xl mb-1 md:mb-2">📦</p>
                <h3 className="text-[10px] md:text-lg font-bold mb-0.5 md:mb-1">Safe Delivery</h3>
                <p className="text-gray-300 text-[8px] md:text-sm">Secure</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-3xl mb-1 md:mb-2">🎯</p>
                <h3 className="text-[10px] md:text-lg font-bold mb-0.5 md:mb-1">Expert Support</h3>
                <p className="text-gray-300 text-[8px] md:text-sm">24/7 Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreOurScrolling;
