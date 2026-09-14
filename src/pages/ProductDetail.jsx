// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaChevronLeft,
  FaMinus,
  FaPlus,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCheck,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { isWishlisted, toggleWishlist } from '../utils/wishlist';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  /* ── Fetch product + related ─────────────────── */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);
      setRelated([]);
      setQty(1);
      setJustAdded(false);
      setWishlisted(isWishlisted(id));

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        setProduct(data);

        const catRes = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(
            data.category,
          )}`,
        );
        const catData = await catRes.json();
        if (!cancelled) {
          setRelated(catData.filter((p) => p.id !== data.id).slice(0, 4));
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load product');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  /* ── Add to cart ─────────────────────────────── */
  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  /* ── Wishlist toggle ─────────────────────────── */
  const handleToggleWishlist = () => {
    if (!product) return;
    setWishlisted(toggleWishlist(product.id));
  };

  /* ── Loading skeleton ────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-full bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="h-4 w-64 bg-gray-100 rounded mb-8 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="bg-gray-50 rounded-2xl h-[420px] sm:h-[520px] animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="h-6 w-28 bg-gray-100 rounded animate-pulse" />
              <div className="h-24 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-12 w-48 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Error / not found ───────────────────────── */
  if (error || !product) {
    return (
      <div className="min-h-full bg-white font-inter">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaChevronLeft className="w-3 h-3" />
            <span>Back to home</span>
          </button>
        </div>
      </div>
    );
  }

  const rating = product.rating;

  return (
    <div className="min-h-full bg-white font-inter">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 flex-wrap">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/products"
            className="capitalize hover:text-gray-900 transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[220px]">
            {product.title}
          </span>
        </nav>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Left: Image ──────────────────────── */}
          <div>
            <div className="relative bg-gray-50 border border-gray-100 rounded-2xl p-10 h-[420px] sm:h-[520px] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain"
              />

              <button
                onClick={handleToggleWishlist}
                aria-label="Add to wishlist"
                className={`absolute top-4 right-4 p-3 rounded-full border transition-colors duration-200 ${
                  wishlisted
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'bg-white border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <FaHeart className="text-sm" />
              </button>

              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wide font-semibold bg-white/90 backdrop-blur border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: <FaTruck />, label: 'Free shipping' },
                { icon: <FaUndo />, label: '30-day returns' },
                { icon: <FaShieldAlt />, label: '2-year warranty' },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 text-center bg-gray-50 border border-gray-100 rounded-xl py-3"
                >
                  <span className="text-gray-700 text-sm">{b.icon}</span>
                  <span className="text-[11px] text-gray-600 font-medium">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Info ──────────────────────── */}
          <div className="flex flex-col">
            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs ${
                        i < Math.round(rating.rate)
                          ? 'text-amber-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {rating.rate} · {rating.count} reviews
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${(product.price * 1.25).toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                −20%
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-gray-700">
                In stock
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden self-start">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="text-[10px]" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-900">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="text-[10px]" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium px-6 py-3 rounded-lg transition-colors duration-200 ${
                  justAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {justAdded ? (
                  <>
                    <FaCheck className="text-sm" />
                    <span>Added to cart</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="text-sm" />
                    <span>Add to cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleToggleWishlist}
                aria-label="Add to wishlist"
                className={`inline-flex items-center justify-center p-3 rounded-lg border transition-colors duration-200 ${
                  wishlisted
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400'
                }`}
              >
                <FaHeart className="text-sm" />
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={() => {
                if (product) {
                  addItem(product, qty);
                  navigate('/cart');
                }
              }}
              className="w-full border border-gray-200 text-gray-900 text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Buy it now
            </button>

            {/* Meta */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="font-semibold text-gray-900">Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="font-semibold text-gray-900">Product ID:</span>
                <span>#{product.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related products ───────────────────── */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
                  You may also like
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Related products
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="relative bg-gray-50 p-6 h-48 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="max-h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-base font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <FaStar className="text-amber-400 text-[10px]" />
                          <span className="text-xs text-gray-600">
                            {item.rating.rate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProductDetail;