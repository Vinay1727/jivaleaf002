import React from "react";
import { formatINRFromUSD } from "../utils/priceUtils";

const Product = ({ product, addToCart, onClose }) => {
  if (!product) return null;

  const price = product.price || product.salePrice || product.sale_price || 0;
  const description = product.desc || product.description || product.longDescription || '';
  const id = product.id || product._id || (product._id && product._id.toString && product._id.toString());

  return (
    <section className="min-h-screen px-4 py-6 md:py-10 flex items-start justify-center z-50">
      <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-green-900/20 to-black/40 border border-green-700 p-4 md:p-6 rounded-2xl md:rounded-3xl relative backdrop-blur-md">
        <button onClick={onClose} className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-300 hover:text-white z-10 w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">✕</button>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center p-4 md:p-6 shadow-lg relative">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="max-h-64 md:max-h-96 w-full object-contain" />
            ) : (
              <div className="text-7xl md:text-9xl py-8 md:py-12">{product.emoji || '🌿'}</div>
            )}
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Stock Available</div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">{product.name}</h2>
            <p className="text-green-400 font-bold text-xl md:text-2xl mb-3 md:mb-4">₹{Number(price || 0).toFixed(2)}</p>
            <div className="mb-4 text-gray-300 text-xs md:text-sm leading-relaxed" style={{ maxHeight: '200px', md: { maxHeight: '360px' }, overflowY: 'auto' }}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <p className="text-gray-400">No description available.</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => addToCart?.({ id, name: product.name, price, image: product.imageUrl || '' })}
                className="flex-1 px-4 py-2.5 md:px-5 md:py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-sm md:text-base transition transform hover:scale-105 shadow-lg"
              >
                🛒 Add to Cart
              </button>
              <button onClick={onClose} className="px-4 py-2.5 md:hidden border border-gray-500 rounded-lg text-gray-300 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
