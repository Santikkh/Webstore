import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Decorative blur circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left - Content */}
        <div className="space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium tracking-wide">
            ✨ New Autumn Collection 2025
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Wear the
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Future of Fashion
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed">
            Timeless silhouettes, sustainable fabrics, and effortless style — curated
            for the modern wardrobe.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shadow-white/20">
              Shop Collection
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white hover:text-neutral-900 transition-all duration-300">
              Explore Lookbook
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-neutral-400">Unique Styles</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50k+</p>
              <p className="text-sm text-neutral-400">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm text-neutral-400">Sustainable</p>
            </div>
          </div>
        </div>

        {/* Right - Hero Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80"
              alt="Fashion model"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white text-neutral-900 rounded-2xl px-6 py-4 shadow-2xl">
            <p className="text-sm font-medium text-neutral-500">Starting at</p>
            <p className="text-2xl font-bold">$29.99</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;