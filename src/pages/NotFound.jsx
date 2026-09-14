// src/pages/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaCompass,
} from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gray-50 font-inter">
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="text-[18rem] sm:text-[24rem] font-black text-gray-100 select-none leading-none">
            404
          </span>
        </div>

        <div className="relative">
          {/* Icon */}
          <div className="mx-auto h-20 w-20 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
            <FaCompass className="text-2xl text-gray-400" />
          </div>

          {/* Eyebrow */}
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
            Page not found
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            We couldn&apos;t find that page
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist, was moved, or
            you may have mistyped the URL.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <FaHome className="text-xs" />
              <span>Back to home</span>
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-900 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
            >
              <FaSearch className="text-xs" />
              <span>Browse products</span>
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2.5 transition-colors duration-200"
            >
              <FaArrowLeft className="text-xs" />
              <span>Go back</span>
            </button>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-4">
              Popular pages
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Products', to: '/products' },
                { label: 'Cart', to: '/cart' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;