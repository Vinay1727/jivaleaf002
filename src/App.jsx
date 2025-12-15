import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import TopSelling from "./components/TopSelling";
import Reviews from "./components/Reviews";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PaymentTest from "./components/PaymentTest";
import AdminDashboard from "./components/AdminDashboard";
import OrderDetail from './pages/OrderDetail';
import MessageDetail from './pages/MessageDetail';
import UserDetail from './pages/UserDetail';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import About from "./components/About";
import Checkout from "./components/Checkout";
import IndorePlants from "./components/IndorePlants";
import FloweringPlants from "./components/FloweringPlants";
import OutdoorPlants from "./components/OutdoorPlants";
import PlantersAndPots from "./components/PlantersAndPots";
import PlantCareKits from "./components/PlantCareKits";
import CareGuides from "./components/CareGuides";
import MyOrders from "./components/MyOrders";
import Wishlist from "./components/Wishlist";
import Wallet from "./components/Wallet";
import ErrorBoundary from "./components/ErrorBoundary";

/* New Imports */
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageHistory, setPageHistory] = useState(["home"]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [paymentOrderId, setPaymentOrderId] = useState(null);

  // Handle Page Navigation with History
  const handlePageChange = (pageOrFn) => {
    let newPage;
    if (typeof pageOrFn === 'function') {
      newPage = pageOrFn(currentPage);
    } else {
      newPage = pageOrFn;
    }

    if (newPage === currentPage) return;

    // Logic: If going to 'home', reset history. Otherwise push.
    if (newPage === 'home') {
      setPageHistory(['home']);
    } else {
      setPageHistory(prev => [...prev, newPage]);
    }

    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  // Back Button Listener & Status Bar Config
  React.useEffect(() => {
    let isMounted = true;

    const initApp = async () => {
      // Status Bar Config
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        if (window.innerWidth < 768) { // Only on mobile
          await StatusBar.setOverlaysWebView({ overlay: true });
          // We set overlay: true so the background extends behind the status bar,
          // but we MUST pad the content (Navbar) to avoid overlap.
        }
      } catch (e) {
        // likely not running on device
      }

      const listener = await CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        // 1. Close Cart if open
        if (showCart) {
          setShowCart(false);
          return;
        }

        // 2. Handle Page History
        if (pageHistory.length > 1) {
          const newHistory = [...pageHistory];
          newHistory.pop(); // Remove current page
          const previousPage = newHistory[newHistory.length - 1];

          setPageHistory(newHistory);
          setCurrentPage(previousPage);
        } else {
          // 3. If on Home, exit. If elsewhere (and empty history), go Home.
          if (currentPage === 'home') {
            CapacitorApp.exitApp();
          } else {
            setPageHistory(['home']);
            setCurrentPage('home');
          }
        }
      });
      return listener;
    };

    const listenerPromise = initApp();

    return () => {
      isMounted = false;
      listenerPromise.then(listener => listener && listener.remove().catch(e => console.error(e)));
    };
  }, [pageHistory, currentPage, showCart]); // Re-bind when state changes to capture latest values

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...product, quantity: 1, currency: product.currency || 'USD' }];
    });
    setShowCart(true);
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => prev.flatMap((p) => (p.id === id ? (quantity > 0 ? [{ ...p, quantity }] : []) : [p])));
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const cartCount = cartItems.reduce((s, it) => s + it.quantity, 0);

  // Helper to intercept setCurrentPage calls in children
  const exposedSetCurrentPage = handlePageChange;

  return (
    <ErrorBoundary>
      <div className="w-full bg-[#071018] text-white overflow-x-hidden pt-[env(safe-area-inset-top)]">
        {/* Gradient Background */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)",
          }}
        />

        {/* All Modals and Floating Buttons */}

        {/* Main Content */}
        <Navbar setCurrentPage={exposedSetCurrentPage} setShowCart={setShowCart} cartCount={cartCount} addToCart={addToCart} />
        <Cart
          showCart={showCart}
          setShowCart={setShowCart}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          setCurrentPage={exposedSetCurrentPage}
          setPaymentOrderId={setPaymentOrderId}
        />

        {/* Route-aware detail pages (orders/messages/users) */}
        <Routes>
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/messages/:messageId" element={<MessageDetail />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          {/* Fallback route to avoid "No routes matched" warnings for app-managed routes */}
          <Route path="*" element={<></>} />
        </Routes>

        {currentPage === 'payment' && (
          <>
            <PaymentTest orderId={paymentOrderId} setCurrentPage={exposedSetCurrentPage} onPaymentSuccess={() => {
              // clear paymentOrderId and empty cart after successful payment
              setPaymentOrderId(null);
              setCartItems([]);
            }} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}
        {currentPage === 'admin' && (
          <>
            <AdminDashboard setCurrentPage={exposedSetCurrentPage} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "home" && (
          <>
            <HeroSection setCurrentPage={exposedSetCurrentPage} />
            <section className="revealable"><TopSelling addToCart={addToCart} /></section>
            <section className="revealable"><Gallery setCurrentPage={exposedSetCurrentPage} /></section>
            <section className="revealable"><Features /></section>
            <section className="revealable"><Reviews /></section>
            <section className="revealable"><CTA /></section>
            <section className="revealable"><Footer setCurrentPage={exposedSetCurrentPage} /></section>
          </>
        )}

        {/* Reveal observer for sections */}
        <script dangerouslySetInnerHTML={{
          __html: `
        (function(){
          try{
            const obs = new IntersectionObserver((entries)=>{
              entries.forEach(e=>{
                if(e.isIntersecting) e.target.classList.add('revealed');
              });
            },{ threshold: 0.18 });
            document.querySelectorAll('.revealable').forEach(el=>obs.observe(el));
          }catch(e){}
        })();
      ` }} />

        {currentPage === "shop" && (
          <>
            <Gallery setCurrentPage={exposedSetCurrentPage} />
            <Features />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "about" && (
          <>
            <About />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "contact" && (
          <>
            <Contact />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}
        {currentPage === "checkout" && (
          <>
            <Checkout
              cartItems={cartItems}
              setCurrentPage={exposedSetCurrentPage}
              setPaymentOrderId={setPaymentOrderId}
              removeItem={removeItem}
            />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "indoreplants" && (
          <>
            <IndorePlants addToCart={addToCart} setCurrentPage={exposedSetCurrentPage} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "floweringplants" && (
          <>
            <FloweringPlants addToCart={addToCart} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "outdoorplants" && (
          <>
            <OutdoorPlants addToCart={addToCart} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "plantersandpots" && (
          <>
            <PlantersAndPots addToCart={addToCart} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "plantcarekits" && (
          <>
            <PlantCareKits addToCart={addToCart} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "careguides" && (
          <>
            <CareGuides />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "myorders" && (
          <>
            <MyOrders setCurrentPage={exposedSetCurrentPage} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "wishlist" && (
          <>
            <Wishlist setCurrentPage={exposedSetCurrentPage} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "wallet" && (
          <>
            <Wallet setCurrentPage={exposedSetCurrentPage} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === "profile" && (
          <>
            <Profile setCurrentPage={exposedSetCurrentPage} />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage !== "home" && currentPage !== "contact" && currentPage !== "shop" && currentPage !== "about" && currentPage !== "checkout" && currentPage !== "indoreplants" && currentPage !== "floweringplants" && currentPage !== "outdoorplants" && currentPage !== "plantersandpots" && currentPage !== "plantcarekits" && currentPage !== "careguides" && currentPage !== "myorders" && currentPage !== "wishlist" && currentPage !== "wallet" && currentPage !== "profile" && currentPage !== "admin" && (
          <>
            <HeroSection setCurrentPage={exposedSetCurrentPage} />
            <section className="revealable"><TopSelling addToCart={addToCart} /></section>
            <section className="revealable"><Gallery setCurrentPage={exposedSetCurrentPage} /></section>
            <section className="revealable"><Features /></section>
            <section className="revealable"><Reviews /></section>
            <section className="revealable"><CTA /></section>
            <section className="revealable"><Footer setCurrentPage={exposedSetCurrentPage} /></section>
          </>
        )}

        {currentPage === 'terms' && (
          <>
            <Terms />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}

        {currentPage === 'privacy' && (
          <>
            <PrivacyPolicy />
            <Footer setCurrentPage={exposedSetCurrentPage} />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
