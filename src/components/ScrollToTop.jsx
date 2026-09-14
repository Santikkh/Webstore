// src/components/ScrollToTop.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = ({ smooth = false, showButton = true }) => {
  const { pathname, search } = useLocation();
  const [visible, setVisible] = useState(false);

  /* ── 1. Auto-scroll to top on route change ───── */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'instant',
    });
  }, [pathname, search, smooth]);

  /* ── 2. Show/hide the floating button ─────────── */
  useEffect(() => {
    if (!showButton) return;

    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => window.removeEventListener('scroll', onScroll);
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 ${
            visible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <FaArrowUp className="text-sm" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;