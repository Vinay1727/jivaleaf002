import React from "react";
import { formatINRFromUSD } from "../utils/priceUtils";

const features = [
  {
    icon: "🚚",
    title: "Free Shipping",
    description: `Free delivery on orders over ${formatINRFromUSD(50)} across the country`
  },
  {
    icon: "🎁",
    title: "Quality Guarantee",
    description: "100% healthy plants or money back guarantee"
  },
  {
    icon: "🌍",
    title: "Eco-Friendly",
    description: "Sustainable packaging and carbon-neutral shipping"
  },
  {
    icon: "📞",
    title: "Expert Support",
    description: "24/7 customer support and plant care guidance"
  },
];

const Features = () => {
  return (
    <section className="px-0 py-8 md:py-16 bg-gradient-to-b from-transparent to-green-950/20">
      <div className="max-w-full mx-auto px-4 md:px-8">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-6 md:mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-900/30 to-black/40 border border-green-700 p-3 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-md hover:border-green-500 transition-all text-center group relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition" style={{
                backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
                backgroundSize: "30px 30px"
              }}></div>
              <div className="text-2xl md:text-5xl mb-1.5 md:mb-4 group-hover:scale-125 transition transform drop-shadow-lg relative z-10">{feature.icon}</div>
              <h3 className="text-xs md:text-xl font-bold mb-1 md:mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-[10px] md:text-sm leading-tight">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
