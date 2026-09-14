// src/components/ProductGrid.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { isWishlisted, toggleWishlist } from '../utils/wishlist';

const ITEMS_PER_PAGE = 8;

const ProductGrid = ({ searchQuery = '' }) => {
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Per-card "Added!" feedback: { [productId]: true }
  const [justAdded, setJustAdded] = useState({});

  // Per-card wishlist state: { [productId]: true }
  const [wishlisted, setWishlisted] = useState({});

  /* ── Fetch products ─────────────────────────── */
  useEffect(() => {
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
  }, []);

  /* ── Hydrate wishlist state from localStorage ─ */
  useEffect(() => {
    if (!products.length) return;
    const map = {};
    products.forEach((p) => {
      if (isWishlisted(p.id)) map[p.id] = true;
    });
    setWishlisted(map);
  }, [products]);

  /* ── Categories derived from products ───────── */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  /* ── Filter + sort ──────────────────────────── */
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products
      .filter((p) => (category === 'all' ? true : p.category === category))
      .filter((p) => (q === '' ? true : p.title.toLowerCase().includes(q)))
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'rating')
          return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
        if (sort === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, category, searchQuery, sort]);

  /* ── Pagination ─────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [category, sort, searchQuery]);

  // Clamp page if it exceeds totalPages
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  /* ── Add-to-cart handler ─────────────────────── */
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

  /* ── Wishlist toggle ─────────────────────────── */
  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const nowSaved = toggleWishlist(product.id);
    setWishlisted((prev) => ({ ...prev, [product.id]: nowSaved }));
  };

  /* ── Loading skeleton ───────────────────────── */
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 w-56 bg-gray-100 rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl h-80 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  /* ── Error state ────────────────────────────── */
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-900 font-medium mb-1">Something went wrong</p>
        <p className="text-sm text-gray-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-inter">
      {/* ── Header ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
            Browse the store
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            All Products
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">
            {filtered.length} item{filtered.length === 1 ? '' : 's'} found
            {searchQuery && ` for “${searchQuery}”`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters((s) => !s)}
            className="lg:hidden inline-flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-400 transition-colors"
          >
            <FaFilter className="text-xs" />
            <span>Filters</span>
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-gray-400"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating: High → Low</option>
            <option value="title">Title: A → Z</option>
          </select>
        </div>
      </div>

      {/* ── Category pills ─────────────────────── */}
      <div
        className={`mb-8 flex-wrap gap-2 ${
          showFilters ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-200 capitalize ${
              category === cat
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* ── Empty state ────────────────────────── */}
      {pageItems.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-gray-900 font-medium">No products found</p>
          <p className="text-sm text-gray-500 mt-1">
            Try changing your search or category filter.
          </p>
        </div>
      ) : (
        <>
          {/* ── Grid ───────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageItems.map((product) => {
              const isAdded = !!justAdded[product.id];
              const isSaved = !!wishlisted[product.id];

              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative bg-gray-50 p-6 h-52 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
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
                </Link>
              );
            })}
          </div>

          {/* ── Pagination ─────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Previous page"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`min-w-[36px] h-9 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      page === p
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Next page"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductGrid;