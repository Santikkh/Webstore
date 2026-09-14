// src/components/SearchProducts.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaTimes,
  FaStar,
  FaSpinner,
  FaArrowRight,
} from 'react-icons/fa';

const MAX_RESULTS = 6;

const SearchProducts = ({ open, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(-1);

  /* ── Focus input when opened ─────────────────── */
  useEffect(() => {
    if (open) {
      // Slight delay so the mount transition completes
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      setQuery('');
      setHighlighted(-1);
    }
  }, [open]);

  /* ── Fetch products once when opened ─────────── */
  useEffect(() => {
    if (!open || products.length) return;
    let cancelled = false;

    (async () => {
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
    })();

    return () => {
      cancelled = true;
    };
  }, [open, products.length]);

  /* ── Click outside to close ──────────────────── */
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open, onClose]);

  /* ── ESC to close ────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  /* ── Filtered suggestions ────────────────────── */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS);
  }, [products, query]);

  /* ── Keyboard navigation ─────────────────────── */
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(results.length - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(-1, h - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlighted >= 0 && results[highlighted]) {
        onClose?.();
        navigate(`/product/${results[highlighted].id}`);
      } else if (query.trim()) {
        onClose?.();
        navigate(`/products?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  /* ── Submit — navigate to full results page ──── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onClose?.();
    navigate(`/products?q=${encodeURIComponent(q)}`);
  };

  /* ── Don't render when closed ────────────────── */
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-[fadeIn_0.15s_ease-out]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-20 left-1/2 -translate-x-1/2 w-[min(92vw,600px)] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-[slideDown_0.2s_ease-out] font-inter"
      >
        {/* Search input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 border-b border-gray-100"
        >
          <FaSearch className="text-gray-400 text-sm shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlighted(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search products…"
            className="flex-1 text-sm text-gray-900 bg-transparent placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-gray-400 hover:text-gray-700 rounded transition-colors"
              aria-label="Clear"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Close search"
          >
            <FaTimes className="text-xs" />
          </button>
        </form>

        {/* Results area */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-500">
              <FaSpinner className="animate-spin" />
              <span>Loading products…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-10 text-center text-sm text-gray-500">
              {error}
            </div>
          )}

          {/* Idle prompt */}
          {!loading && !error && query.trim().length < 2 && (
            <div className="py-10 text-center text-sm text-gray-500">
              Type at least 2 characters to search.
            </div>
          )}

          {/* No results */}
          {!loading &&
            !error &&
            query.trim().length >= 2 &&
            results.length === 0 && (
              <div className="py-10 text-center text-sm text-gray-500">
                No products found for “{query}”.
              </div>
            )}

          {/* Results list */}
          {!loading && !error && results.length > 0 && (
            <ul className="py-2">
              {results.map((product, idx) => {
                const active = highlighted === idx;
                return (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      onMouseEnter={() => setHighlighted(idx)}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                        active ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="shrink-0 w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center p-1.5">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-500 capitalize">
                            {product.category}
                          </span>
                          {product.rating && (
                            <span className="inline-flex items-center gap-0.5 text-[11px] text-gray-500">
                              <FaStar className="text-amber-400 text-[9px]" />
                              {product.rating.rate}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 shrink-0">
                        ${product.price.toFixed(2)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* See all */}
          {!loading &&
            !error &&
            results.length > 0 &&
            query.trim().length >= 2 && (
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 border-t border-gray-100 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>See all results for “{query}”</span>
                <FaArrowRight className="w-3 h-3" />
              </button>
            )}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translate(-50%, -8px); }
            to   { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </>
  );
};

export default SearchProducts;