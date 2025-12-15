import React, { useEffect, useRef, useState } from "react";
import { formatINRFromUSD } from "../utils/priceUtils";

// Configure slideshow images (update filenames here to add/remove images)
const SLIDES = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
];

const HeroSection = ({ setCurrentPage, heroImgOpacity = 1, accentSize = 206, accentColor = '#16a34a', accentOpacity = 0.12, slideInterval = 4000 }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  // build full URL for an image filename in the HomeScrollimage folder
  const slideUrl = (filename) => new URL(`../../HomeScrollimage/${filename}`, import.meta.url).href;

  useEffect(() => {
    // autoplay
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), slideInterval);
    return () => clearInterval(timerRef.current);
  }, [slideInterval]);

  const goTo = (i) => {
    setCurrent(i % SLIDES.length);
    // reset timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), slideInterval);
    }
  };
  // helper: convert hex color to rgba string with alpha
  const hexToRgba = (hex, alpha = 1) => {
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned.length === 3 ? cleaned.split('').map(c => c + c).join('') : cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  return (
    <section className="w-full px-0 py-6 md:py-12 flex flex-col gap-6 md:gap-10">
      <div className="px-4 md:px-8">
        {/* Main Hero Banner */}
        <div className="w-full bg-gradient-to-r from-green-900/40 via-emerald-900/30 to-green-900/40 border border-green-700 rounded-xl md:rounded-2xl p-4 md:p-10 shadow-2xl overflow-hidden relative min-h-[500px] h-auto md:h-[520px]">
          {/* Accent circle (no blur) - color effect on top-right of hero; size and color controllable via props */}
          <div
            className="absolute top-0 right-0 -z-10 rounded-full"
            style={{
              width: `${accentSize}px`,
              height: `${accentSize}px`,
              transform: 'translate(25%, -15%)',
              background: `radial-gradient(circle at center, ${hexToRgba(accentColor, accentOpacity)} 0%, transparent 60%)`
            }}
          ></div>

          {/* Background slideshow (no blur on image). Images are cover-sized and layered behind content. */}
          <div className="absolute inset-0 z-0">
            {SLIDES.map((f, i) => (
              <div
                key={f}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${slideUrl(f)})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'opacity'
                }}
              />
            ))}
          </div>

          {/* SVG pattern overlay (subtle) - responsive for mobile */}
          <div className="absolute inset-0 opacity-8 z-10" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2250%22 height=%2250%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M10,25 Q25,10 40,25%22 stroke=%22%2322c55e%22 fill=%22none%22 opacity=%220.12%22/%3E%3C/svg%3E')",
            backgroundRepeat: "repeat",
            backgroundSize: "50px 50px"
          }}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full z-20">
            {/* Left Content - Dark background for readability */}
            <div className="space-y-3 md:space-y-4 z-20 bg-black/60 p-4 md:p-8 rounded-lg md:rounded-xl backdrop-blur-sm">
              <div>
                <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-2 leading-tight text-white">
                  🌱 Fresh Green <span className="text-green-400">Plants</span>
                </h1>
                <p className="text-sm md:text-lg text-green-300 font-semibold">Transform Your Home & Office</p>
              </div>

              <p className="text-gray-100 text-xs md:text-base leading-relaxed max-w-lg">
                Premium indoor & outdoor plants. Hand-selected & guaranteed fresh. Perfect for everyone!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2">
                <div>
                  <p className="text-xl md:text-3xl font-bold text-green-400">From {formatINRFromUSD(25.99)}</p>
                </div>
                <div className="text-gray-300 text-xs border-l border-green-500 pl-3">
                  <p>✓ Free shipping over {formatINRFromUSD(50)}</p>
                  <p>✓ 100% Fresh Guarantee</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button onClick={() => setCurrentPage?.("shop")} className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-bold transition transform hover:scale-105 shadow-lg text-sm">
                  🛒 Shop
                </button>
                <button onClick={() => setCurrentPage?.("careguides")} className="px-6 py-2 border-2 border-green-500 hover:bg-green-500/20 text-white rounded-lg font-bold transition text-sm">
                  📚 Learn
                </button>
              </div>
            </div>

            {/* Right Stats with Images */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-md md:rounded-lg p-2 md:p-4 border border-green-600/50 text-center hover:border-green-400 transition relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition" style={{
                  backgroundImage: "linear-gradient(135deg, #22c55e 0%, #059669 100%)"
                }}></div>
                <p className="text-2xl md:text-4xl mb-1 group-hover:scale-110 transition transform">🌿</p>
                <p className="text-white font-bold text-xs md:text-sm">2,500+</p>
                <p className="text-gray-300 text-[10px] md:text-xs">Indoor</p>
              </div>
              <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-md md:rounded-lg p-2 md:p-4 border border-green-600/50 text-center hover:border-green-400 transition relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition" style={{
                  backgroundImage: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
                }}></div>
                <p className="text-2xl md:text-4xl mb-1 group-hover:scale-110 transition transform">🌸</p>
                <p className="text-white font-bold text-xs md:text-sm">1,200+</p>
                <p className="text-gray-300 text-[10px] md:text-xs">Flowers</p>
              </div>
              <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-md md:rounded-lg p-2 md:p-4 border border-green-600/50 text-center hover:border-green-400 transition relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition" style={{
                  backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                }}></div>
                <p className="text-2xl md:text-4xl mb-1 group-hover:scale-110 transition transform">🏆</p>
                <p className="text-white font-bold text-xs md:text-sm">10K+</p>
                <p className="text-gray-300 text-[10px] md:text-xs">Happy</p>
              </div>
            </div>
          </div>

          {/* Slide controls (dots) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-30 flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-white/40'} border border-white/20`}
              />
            ))}
          </div>
        </div>

        {/* Features Bar - Compact */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-gradient-to-br from-green-900/30 to-black/40 border border-green-700 p-2 md:p-5 rounded-lg text-center hover:border-green-500 transition relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition" style={{
              backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}></div>
            <p className="text-xl md:text-3xl mb-1 md:mb-2 group-hover:scale-125 transition transform">✅</p>
            <h3 className="text-[10px] md:text-base font-bold mb-0.5 md:mb-1 leading-tight">Authentic</h3>
            <p className="text-gray-400 text-[8px] md:text-xs">100% Genuine</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-black/40 border border-green-700 p-2 md:p-5 rounded-lg text-center hover:border-green-500 transition relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition" style={{
              backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}></div>
            <p className="text-xl md:text-3xl mb-1 md:mb-2 group-hover:scale-125 transition transform">📦</p>
            <h3 className="text-[10px] md:text-base font-bold mb-0.5 md:mb-1 leading-tight">Safe Delivery</h3>
            <p className="text-gray-400 text-[8px] md:text-xs">Packed with care</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-black/40 border border-green-700 p-2 md:p-5 rounded-lg text-center hover:border-green-500 transition relative overflow-hidden group">
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition" style={{
              backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}></div>
            <p className="text-xl md:text-3xl mb-1 md:mb-2 group-hover:scale-125 transition transform">🎯</p>
            <h3 className="text-[10px] md:text-base font-bold mb-0.5 md:mb-1 leading-tight">Expert Help</h3>
            <p className="text-gray-400 text-[8px] md:text-xs">24/7 Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
