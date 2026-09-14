// src/components/FeatureProducts.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaCheck,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { isWishlisted, toggleWishlist } from '../utils/wishlist';

const CARD_WIDTH = 260; // px — used for the loop math
const SPEED = 40;       // px per second

const FeatureProducts = () => {
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  // Per-card "Added!" feedback: { [productId]: true }
  const [justAdded, setJustAdded] = useState({});

  // Per-card wishlist state: { [productId]: true }
  const [wishlisted, setWishlisted] = useState({});

  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  /* ── 1. Fetch products ─────────────────────────── */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── 2. Hydrate wishlist state from localStorage ─ */
  useEffect(() => {
    if (!products.length) return;
    const map = {};
    products.forEach((p) => {
      if (isWishlisted(p.id)) map[p.id] = true;
    });
    setWishlisted(map);
  }, [products]);

  /* ── 3. Duplicate products so the loop is seamless ─ */
  const oneCopyWidth = products.length * CARD_WIDTH;

  const copies = products.length
    ? Math.max(2, Math.ceil((window.innerWidth * 2) / oneCopyWidth) + 1)
    : 1;

  const loopProducts = useMemo(
    () => Array.from({ length: copies }).flatMap(() => products),
    [products, copies]
  );

  /* ── 4. requestAnimationFrame loop ──────────────── */
  useEffect(() => {
    if (isPaused || !products.length) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    const tick = (now) => {
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setOffset((prev) => {
        const next = prev + SPEED * dt;
        return next >= oneCopyWidth ? next - oneCopyWidth : next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused, products.length, oneCopyWidth]);

  /* ── 5. Manual arrow scroll ─────────────────────── */
  const nudge = (dir) => {
    setIsPaused(true);
    setOffset((prev) => {
      let next = prev + dir * CARD_WIDTH;
      if (next < 0) next += oneCopyWidth;
      if (next >= oneCopyWidth) next -= oneCopyWidth;
      return next;
    });
    setTimeout(() => setIsPaused(false), 1500);
  };

  /* ── 6. Add-to-cart handler ─────────────────────── */
  const handleAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, 1);

    setJustAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setJustAdded((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
    }, 1200);
  };

  /* ── 7. Wishlist toggle ─────────────────────────── */
  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const nowSaved = toggleWishlist(product.id);
    setWishlisted((prev) => ({ ...prev, [product.id]: nowSaved }));
  };

  /* ── Loading skeleton ───────────────────────────── */
  if (loading) {
    return (
      <section className="w-full bg-white font-inter border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="h-7 w-56 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-4 w-40 bg-gray-100 rounded-lg mt-3 animate-pulse" />
        </div>
        <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-12 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 bg-white border border-gray-100 rounded-2xl h-[360px] animate-pulse"
              style={{ width: CARD_WIDTH }}
            />
          ))}
        </div>
      </section>
    );
  }

  /* ── Error state ────────────────────────────────── */
  if (error) {
    return (
      <section className="w-full bg-white font-inter border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-900 font-medium mb-1">Something went wrong</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </section>
    );
  }

  /* ── Main render ────────────────────────────────── */
  return (
    <section className="w-full bg-white font-inter border-b border-gray-100">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
            Curated for you
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Featured Products
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">
            {products.length} items • auto-scrolling
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Manual arrows */}
          <button
            onClick={() => nudge(1)}
            aria-label="Scroll left"
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={() => nudge(-1)}
            aria-label="Scroll right"
            className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FaChevronRight className="text-xs" />
          </button>

          {/* View all */}
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-2"
          >
            <span>View all</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Auto-scrolling row */}
      <div
        className="relative w-full overflow-hidden pb-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Track */}
        <div
          className="flex will-change-transform"
          style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
        >
          {loopProducts.map((product, idx) => {
            const isAdded = !!justAdded[product.id];
            const isSaved = !!wishlisted[product.id];

            return (
              <div
                key={`${product.id}-${idx}`}
                className="shrink-0 px-3"
                style={{ width: CARD_WIDTH }}
              >
                {/* Card (clickable → detail page) */}
                <Link
                  to={`/product/${product.id}`}
                  className="block h-full"
                  draggable={false}
                >
                  <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
                    {/* Image area */}
                    <div className="relative bg-gray-50 p-6 h-52 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        draggable={false}
                        className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Wishlist toggle */}
                      <button
                        onClick={(e) => handleToggleWishlist(e, product)}
                        className={`absolute top-3 right-3 p-2 rounded-full border transition-colors duration-200 ${
                          isSaved
                            ? 'bg-rose-500 border-rose-500 text-white'
                            : 'bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:border-rose-200'
                        }`}
                        aria-label={
                          isSaved
                            ? `Remove ${product.title} from wishlist`
                            : `Add ${product.title} to wishlist`
                        }
                      >
                        <FaHeart className="text-xs" />
                      </button>

                      {/* Category pill */}
                      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide font-semibold bg-white/90 backdrop-blur border border-gray-100 text-gray-600 px-2 py-1 rounded-full max-w-[150px] truncate">
                        {product.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3
                        className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2"
                        title={product.title}
                      >
                        {product.title}
                      </h3>

                      {product.rating && (
                        <div className="flex items-center gap-1 mb-3">
                          <FaStar className="text-amber-400 text-xs" />
                          <span className="text-xs text-gray-600">
                            {product.rating.rate} ({product.rating.count})
                          </span>
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>

                        {/* Add to cart */}
                        <button
                          onClick={(e) => handleAdd(e, product)}
                          className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                            isAdded
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          }`}
                          aria-label={`Add ${product.title} to cart`}
                        >
                          {isAdded ? (
                            <>
                              <FaCheck className="text-xs" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <FaShoppingCart className="text-xs" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;