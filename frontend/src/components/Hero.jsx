// src/components/Hero.jsx
import React from 'react';

export default function Hero(){
  return (
    <section className="bg-gradient-to-br from-iwish-50 to-white py-14">
      <div className="container mx-auto px-4 md:flex items-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">iWish — Save what you love</h1>
          <p className="text-lg text-gray-600 mb-6">Create beautiful wishlists, discover curated products, and come back to what matters. Share with friends or keep private.</p>
          <div className="flex gap-3">
            <a href="/" className="btn-primary">Shop Collection</a>
            <a href="/forum" className="btn-primary">Community</a>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <div className="w-96 h-64 rounded-lg overflow-hidden shadow-lg bg-white flex items-center justify-center">
            <img src="./frontend/src/components/hero-example.jpg" alt="hero" className="object-contain max-h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
