// src/components/ProductCard.jsx
import React from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart }) => {
  const { title, price, image, category, rating } = product;

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative bg-gray-50 p-6 h-56 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-h-40 object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 p-2 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors"
          aria-label="Add to wishlist"
        >
          <FaHeart className="text-xs" />
        </button>

        {/* Category pill */}
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide font-semibold bg-white/90 backdrop-blur border border-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2"
          title={title}
        >
          {title}
        </h3>

        {rating && (
          <div className="flex items-center gap-1 mb-3">
            <FaStar className="text-amber-400 text-xs" />
            <span className="text-xs text-gray-600">
              {rating.rate} ({rating.count})
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={() => onAddToCart?.(product)}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <FaShoppingCart className="text-xs" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
