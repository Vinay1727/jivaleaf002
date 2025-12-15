import React, { useState, useEffect, useRef } from "react";
import Product from "./Product";
import { formatINRFromUSD } from "../utils/priceUtils";

const API_BASE = "https://newplant-9.onrender.com";

const OutdoorPlants = ({ addToCart }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [allPlants, setAllPlants] = useState([]);
  const [topPlants, setTopPlants] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const autoScrollTimerRef = useRef(null);

  useEffect(() => {
    fetchOutdoorPlants();
  }, []);

  const fetchOutdoorPlants = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/plants/outdoor`);
      const data = await response.json();

      if (data.success) {
        setAllPlants(data.plants);
        const sorted = data.plants.sort((a, b) => b.salePrice - a.salePrice).slice(0, 10);
        setTopPlants(sorted);
        setError(null);
      } else {
        setError("Failed to load outdoor plants");
      }
    } catch (err) {
      console.error("Error fetching outdoor plants:", err);
      setError("Error loading outdoor plants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topPlants.length > 0) {
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % topPlants.length);
      }, 4000);

      return () => clearInterval(autoScrollTimerRef.current);
    }
  }, [topPlants.length]);

  const goToSlide = (index) => {
    setCurrentSlideIndex(index % topPlants.length);
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % topPlants.length);
      }, 4000);
    }
  };

  const currentPlant = topPlants[currentSlideIndex];

  return (
    <section className="min-h-screen px-0 py-8 md:py-16 bg-gradient-to-b from-transparent to-green-950/10">
      <div className="max-w-full mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">🌴 Outdoor Plants Collection</h2>
          <p className="text-sm md:text-xl text-gray-300 mb-1 md:mb-2">Hardy outdoor trees and plants for your garden</p>
          <p className="text-gray-400 text-xs md:text-base">Create a beautiful outdoor space</p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">Loading outdoor plants...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-red-900/20 border border-red-700 rounded-lg p-6">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={fetchOutdoorPlants}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && topPlants.length > 0 && (
          <>
            {/* Top 10 Price Scrollable Image Carousel + Detail View */}
            <div className="mb-8 md:mb-16 p-4 md:p-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700 rounded-xl md:rounded-2xl">
              <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-center">🌟 Top 10 Premium Outdoor Plants</h3>

              {/* Carousel and Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                {/* Left: Carousel */}
                <div className="lg:col-span-1">
                  <div className="relative overflow-hidden rounded-xl bg-black/30">
                    {/* Main carousel image */}
                    <div className="relative h-48 md:h-80 overflow-hidden group">
                      {currentPlant?.imageUrl && (
                        <img
                          src={currentPlant.imageUrl}
                          alt={currentPlant.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                        <h4 className="text-sm md:text-lg font-bold mb-1">{currentPlant?.name}</h4>
                        <p className="text-green-300 font-semibold text-sm md:text-base">₹{currentPlant?.salePrice}</p>
                      </div>
                    </div>

                    {/* Image dots/controls */}
                    <div className="bg-black/40 px-4 py-3 flex justify-center gap-2 flex-wrap">
                      {topPlants.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToSlide(i)}
                          className={`h-3 rounded-full transition-all duration-200 ${i === currentSlideIndex
                            ? 'bg-green-400 w-8'
                            : 'bg-gray-500 w-3 hover:bg-green-300'
                            }`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* Thumbnail scroll strip */}
                    <div className="bg-black/50 px-3 py-2 overflow-x-auto scrollbar-hide">
                      <div className="flex gap-2 pb-2">
                        {topPlants.map((plant, i) => (
                          <button
                            key={plant._id}
                            onClick={() => goToSlide(i)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${i === currentSlideIndex
                              ? 'border-green-400 ring-2 ring-green-400'
                              : 'border-gray-600 hover:border-green-500'
                              }`}
                          >
                            {plant.imageUrl ? (
                              <img
                                src={plant.imageUrl}
                                alt={plant.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
                                No img
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Plant Details */}
                {currentPlant && (
                  <div className="lg:col-span-2 space-y-4 transition-all duration-500">
                    <div className="transition-all duration-500">
                      <h2 className="text-xl md:text-3xl font-bold mb-2 transition-all duration-500">{currentPlant.name}</h2>
                      <div className="flex items-baseline gap-3 transition-all duration-500">
                        <p className="text-xl md:text-2xl font-bold text-green-400 transition-all duration-500">₹{currentPlant.salePrice}</p>
                        {currentPlant.oldPrice && (
                          <p className="text-gray-500 line-through text-lg transition-all duration-500">₹{currentPlant.oldPrice}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {currentPlant.description && (
                      <div className="bg-black/40 rounded-xl p-4 max-h-48 overflow-y-auto transition-all duration-500">
                        <h3 className="text-base md:text-lg font-bold mb-2 transition-all duration-500">About This Plant</h3>
                        <div
                          className="text-gray-300 text-sm leading-relaxed transition-all duration-500"
                          dangerouslySetInnerHTML={{
                            __html: currentPlant.description,
                          }}
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => addToCart({
                          id: currentPlant._id,
                          name: currentPlant.name,
                          price: currentPlant.salePrice,
                          currency: 'INR',
                          image: currentPlant.imageUrl,
                        })}
                        className="flex-1 px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-lg font-bold transition transform hover:scale-105 shadow-lg text-sm"
                      >
                        🛒 Add to Cart
                      </button>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-lg p-3 border border-green-600/50 text-center">
                        <p className="text-xl mb-1">✅</p>
                        <p className="text-white font-bold text-xs">100% Fresh</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-lg p-3 border border-green-600/50 text-center">
                        <p className="text-xl mb-1">📦</p>
                        <p className="text-white font-bold text-xs">Free Shipping</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-lg p-3 border border-green-600/50 text-center">
                        <p className="text-xl mb-1">🎯</p>
                        <p className="text-white font-bold text-xs">24/7 Support</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 rounded-lg p-3 border border-green-600/50 text-center">
                        <p className="text-xl mb-1">🌿</p>
                        <p className="text-white font-bold text-xs">Care Guide</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {!loading && !error && allPlants.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No outdoor plants available at the moment</p>
          </div>
        )}

        {/* All Plants Grid */}
        {!loading && !error && allPlants.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mt-12">
            {allPlants.map((p) => (
              <div
                key={p._id}
                onClick={() => setSelectedProduct(p)}
                className="bg-gradient-to-br from-green-900/20 to-black/40 border border-green-700 p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition duration-300 cursor-pointer transform hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition pointer-events-none" style={{
                  backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
                  backgroundSize: "25px 25px"
                }}></div>

                {p.imageUrl && (
                  <div className="w-full h-24 md:h-32 mb-2 md:mb-4 rounded-lg overflow-hidden bg-gray-700 relative z-10">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition transform"
                    />
                  </div>
                )}

                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 h-8 md:h-12 flex items-center line-clamp-2">{p.name}</h3>

                {p.description && (
                  <p className="text-gray-300 mb-2 md:mb-4 text-xs md:text-sm h-10 md:h-20 overflow-hidden line-clamp-2 md:line-clamp-3 hidden md:block">
                    {p.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-2 md:pt-4 border-t border-green-700/30">
                  <div>
                    <p className="text-green-400 font-bold text-sm md:text-lg">₹{p.salePrice}</p>
                    {p.oldPrice && (
                      <p className="text-gray-500 line-through text-xs md:text-sm">₹{p.oldPrice}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); addToCart({
                        id: p._id,
                        name: p.name,
                        price: p.salePrice,
                        currency: 'INR',
                        image: p.imageUrl
                      });
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition text-xs md:text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
            <div className="relative w-full max-w-4xl mx-auto overflow-auto" style={{ maxHeight: '90vh' }}>
              <div className="rounded-lg overflow-hidden">
                <Product product={selectedProduct} addToCart={addToCart} onClose={() => setSelectedProduct(null)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OutdoorPlants;
