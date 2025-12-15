import React, { useRef, useEffect } from "react";
import { toINR, formatINR } from "../utils/priceUtils";

const API_BASE = "https://newplant-9.onrender.com";

const Cart = ({ showCart, setShowCart, cartItems = [], updateQuantity, removeItem, setCurrentPage, setPaymentOrderId }) => {
  // Ref for cart to detect clicks outside
  const cartRef = useRef(null);

  // Handle click outside cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If cart is open and click is outside the cart container
      if (showCart && cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    // Add event listener when cart is open
    if (showCart) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCart, setShowCart]);
  // Compute subtotal in INR. Items may be stored in USD (default) or INR (csv/backend).
  const subtotalINR = cartItems.reduce((sum, item) => {
    const priceINR = item.currency === 'INR' ? Number(item.price || 0) : toINR(item.price || 0);
    return sum + priceINR * (item.quantity || 1);
  }, 0);

  const taxINR = +(subtotalINR * 0.1).toFixed(2);
  const shippingINR = cartItems.length > 0 ? toINR(5) : 0;
  const totalINR = +(subtotalINR + taxINR + shippingINR).toFixed(2);

  return (
    <>
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center md:items-end justify-center md:justify-end">
          <div ref={cartRef} className="w-full md:w-80 bg-[#071018] border-2 md:border-l-2 border-green-600 rounded-3xl md:rounded-t-3xl md:rounded-br-none p-5 max-h-[90vh] md:max-h-screen overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-400">🛒 Cart</h2>
              <button onClick={() => setShowCart(false)} className="text-2xl text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-green-900/20 border border-green-700 p-3 rounded-lg flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gray-700 overflow-hidden flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-3xl">{item.emoji || '🌿'}</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm">{item.name}</h3>
                          <p className="text-green-400 text-sm">{formatINR(item.currency === 'INR' ? Number(item.price || 0) : toINR(item.price || 0))}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-500 rounded text-white font-bold text-lg transition"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-500 rounded text-white font-bold text-lg transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-400 text-xl hover:bg-red-500/10 rounded-full transition"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="border-t border-green-700 pt-3 space-y-1.5">
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Subtotal:</span>
                    <span>{formatINR(subtotalINR)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Tax (10%):</span>
                    <span>{formatINR(taxINR)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Shipping:</span>
                    <span>{formatINR(shippingINR)}</span>
                  </div>
                  <div className="flex justify-between text-green-400 text-lg font-bold border-t border-green-700 pt-2">
                    <span>Total:</span>
                    <span>{formatINR(totalINR)}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('auth_token');
                      if (!token) {
                        window.dispatchEvent(new Event('open-login'));
                        alert('Please login or sign up before placing an order');
                        return;
                      }
                      setShowCart(false);
                      setCurrentPage?.('checkout');
                    }}
                    className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition transform hover:scale-105 text-sm"
                  >
                    ✅ Checkout
                  </button>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full py-2.5 border border-green-600 hover:bg-green-600/10 text-white font-semibold rounded-lg transition text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}


    </>
  );
};

export default Cart;
