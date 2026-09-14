// src/pages/Wishlist.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaStar,
  FaArrowRight,
  FaCheck,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import {
  readWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../utils/wishlist';

const Wishlist = () => {
  const { addItem } = useCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Per-card "Added!" feedback: { [productId]: true }
  const [justAdded, setJustAdded] = useState({});

  /* ── Fetch wishlisted products ───────────────── */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      const ids = readWishlist();

      if (ids.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.all(
          ids.map((pid) =>
            fetch(`https://fakestoreapi.com/products/${pid}`)
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          )
        );
        if (cancelled) return;

        // Keep only successfully fetched products
        setItems(results.filter(Boolean));
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load wishlist');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Remove item ─────────────────────────────── */
  const handleRemove = (id) => {
    removeFromWishlist(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  /* ── Clear all ───────────────────────────────── */
  const handleClearAll = () => {
    clearWishlist();
    setItems([]);
  };

  /* ── Add to cart ─────────────────────────────── */
  const handleAdd = (product) => {
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

  /* ── Loading skeleton ────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-full bg-gray-50 font-inter">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="h-8 w-56 bg-gray-100 rounded-lg animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* ── Error state ─────────────────────────────── */
  if (error) {
    return (
      <div className="min-h-full bg-gray-50 font-inter">
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-900 font-medium mb-1">Something went wrong</p>
          <p className="text-sm text-gray-500">{error}</p>
        </main>
      </div>
    );
  }

  /* ── Empty state ─────────────────────────────── */
  if (items.length === 0) {
    return (
      <div className="min-h-full bg-gray-50 font-inter">
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FaHeart className="text-2xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Save products you love by tapping the heart icon.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>Browse products</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </main>
      </div>
    );
  }

  /* ── Main render ─────────────────────────────── */
  return (
    <div className="min-h-full bg-gray-50 font-inter">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Saved for later
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Your Wishlist
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              {items.length} item{items.length === 1 ? '' : 's'} saved
            </p>
          </div>

          <button
            onClick={handleClearAll}
            className="text-xs font-medium text-gray-500 hover:text-rose-600 transition-colors"
          >
            Clear wishlist
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => {
            const isAdded = !!justAdded[product.id];

            return (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="relative bg-gray-50 p-6 h-52 flex items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Remove (heart) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemove(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white border border-gray-100 rounded-full text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-colors duration-200"
                    aria-label="Remove from wishlist"
                  >
                    <FaHeart className="text-xs" />
                  </button>

                  {/* Category pill */}
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide font-semibold bg-white/90 backdrop-blur border border-gray-100 text-gray-600 px-2 py-1 rounded-full max-w-[150px] truncate">
                    {product.category}
                  </span>
                </Link>

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

                    <div className="flex items-center gap-1.5">
                      {/* Trash */}
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        aria-label="Remove"
                      >
                        <FaTrash className="text-xs" />
                      </button>

                      {/* Add to cart */}
                      <button
                        onClick={() => handleAdd(product)}
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
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue shopping */}
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowRight className="w-3 h-3 rotate-180" />
            <span>Continue shopping</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Wishlist;