// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHeart,
  FaUser,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlistCount } from '../hooks/useWishlistCount';
import SearchProducts from './SearchProducts';

const Navbar = () => {
  const { count: cartCount } = useCart();
  const wishlistCount = useWishlistCount();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Product', to: '/products' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>

      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Links */}
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  Webstore
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'text-gray-900 bg-gray-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right: Search button + Icons + CTA + Toggle */}
            <div className="flex items-center gap-2">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Search"
              >
                <FaSearch className="text-base" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Wishlist"
              >
                <FaHeart className="text-base" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Cart"
              >
                <FaShoppingCart className="text-base" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:block p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Account"
              >
                <FaUser className="text-base" />
              </Link>

              {/* Shop Now */}
              <Link
                to="/products"
                className="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-1"
              >
                <span>Shop Now</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((s) => !s)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-base" />
                ) : (
                  <FaBars className="text-base" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <span>Shop Now</span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                aria-label="Wishlist"
              >
                <FaHeart className="text-base" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                aria-label="Cart"
              >
                <FaShoppingCart className="text-base" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] font-semibold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                aria-label="Account"
              >
                <FaUser className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      <SearchProducts
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
