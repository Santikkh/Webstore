import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const SlideShow = () => {
  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
      tag: 'Summer 2026',
      title: 'New Summer Collection',
      subtitle: 'Fresh styles for the warm season',
      cta: 'Shop Now',
      align: 'left',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80',
      tag: 'Essentials',
      title: 'Timeless Denim',
      subtitle: 'Classic fits, modern comfort',
      cta: 'Explore Denim',
      align: 'center',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
      tag: 'Curated',
      title: 'Effortless Elegance',
      subtitle: 'Curated pieces for every occasion',
      cta: 'Discover More',
      align: 'right',
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      {/* Google Font: Inter (matches navbar) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden font-inter">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background image with subtle zoom on active */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === current ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* Simple dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text content */}
            <div
              className={`absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 ${
                slide.align === 'left'
                  ? 'items-start text-left'
                  : slide.align === 'center'
                    ? 'items-center text-center'
                    : 'items-end text-right'
              }`}
            >
              <div className="max-w-xl text-white">
                {/* Tag badge – simple pill */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  {slide.tag}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200 font-normal">
                  {slide.subtitle}
                </p>

                {/* CTA – matching navbar button style */}
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {slide.cta}
                  <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Prev button – simple */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg p-3 transition-colors duration-200"
        >
          <FaChevronLeft className="text-base" />
        </button>

        {/* Next button – simple */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg p-3 transition-colors duration-200"
        >
          <FaChevronRight className="text-base" />
        </button>

        {/* Dots indicator – simple */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/70 w-2'
              }`}
            />
          ))}
        </div>

        {/* Slide counter – simple */}
        <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 hidden sm:flex items-center gap-2 text-white">
          <span className="text-2xl font-bold">
            {String(current + 1).padStart(2, '0')}
          </span>
          <span className="w-6 h-px bg-white/50" />
          <span className="text-sm font-medium text-white/60">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </>
  );
};

export default SlideShow;