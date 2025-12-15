import React from "react";
import { formatINRFromUSD } from "../utils/priceUtils";

const products = [
  { id: 1, name: "Calathea", price: 35.99, emoji: "🌿", desc: "Patterned, low-light plant" },
  { id: 2, name: "Monstera Deliciosa", price: 45.99, emoji: "🍃", desc: "Iconic split-leaf beauty" },
  { id: 3, name: "Snake Plant", price: 29.99, emoji: "🌱", desc: "Tough, low-water plant" },
  { id: 4, name: "Fiddle Leaf Fig", price: 55.99, emoji: "🍂", desc: "Tall indoor tree" },
  { id: 5, name: "Pothos", price: 25.99, emoji: "🌲", desc: "Trailing vine for shelves" },
  { id: 6, name: "Bird of Paradise", price: 65.99, emoji: "🦜", desc: "Tropical statement plant" },
];

const Shop = ({ addToCart }) => {
  return (
    <section className="min-h-screen px-0 py-16 bg-gradient-to-b from-transparent to-green-950/10">
      <div className="max-w-full mx-auto px-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Shop All Plants</h2>
        <p className="text-center text-gray-300 mb-12">Browse our full collection. Click a product to view details.</p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-gradient-to-br from-green-900/20 to-black/40 border border-green-700 p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md hover:border-green-500 transition cursor-pointer">
              <div className="text-4xl md:text-6xl mb-2 md:mb-4">{p.emoji}</div>
              <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 line-clamp-2">{p.name}</h3>
              <p className="text-gray-300 mb-2 md:mb-4 text-xs md:text-base hidden md:block">{p.desc}</p>
              <div className="flex items-center justify-between flex-col md:flex-row gap-2">
                <p className="text-green-400 font-bold text-sm md:text-xl">{formatINRFromUSD(p.price)}</p>
                <button
                  onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, currency: 'USD' })}
                  className="w-full md:w-auto px-3 md:px-4 py-1.5 md:py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs md:text-base font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
