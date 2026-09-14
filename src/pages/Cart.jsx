// src/pages/Cart.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaTag,
  FaTimes,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 100;

const PROMOS = {
  SAVE10: { code: 'SAVE10', rate: 0.1, label: '10% off' },
  SAVE20: { code: 'SAVE20', rate: 0.2, label: '20% off' },
  FREESHIP: { code: 'FREESHIP', rate: 0, label: 'Free shipping' },
};

const Cart = () => {
  const { items, updateQty, removeItem, clearCart, count, subtotal } = useCart();

  const [promo, setPromo] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  /* ── Totals ─────────────────────────────────── */
  const discount = appliedPromo ? subtotal * appliedPromo.rate : 0;
  const shipping =
    subtotal - discount >= FREE_SHIPPING_THRESHOLD ||
    appliedPromo?.code === 'FREESHIP'
      ? 0
      : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  /* ── Promo handlers ─────────────────────────── */
  const applyPromo = () => {
    const key = promo.trim().toUpperCase();
    setPromoError('');
    if (!key) return;
    if (PROMOS[key]) {
      setAppliedPromo(PROMOS[key]);
      setPromo('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  /* ── Empty state ────────────────────────────── */
  if (items.length === 0) {
    return (
      <div className="min-h-full bg-gray-50 font-inter">
        <main className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FaShoppingCart className="text-2xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>Start shopping</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 font-inter">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
              Your bag
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1.5">
              {count} item{count === 1 ? '' : 's'} in your cart
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-medium text-gray-500 hover:text-rose-600 transition-colors"
          >
            Clear cart
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Items ───────────────────────────── */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex gap-4 hover:border-gray-200 transition-colors"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="shrink-0 bg-gray-50 border border-gray-100 rounded-xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {item.category && (
                        <span className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">
                          {item.category}
                        </span>
                      )}
                      <Link
                        to={`/product/${item.id}`}
                        className="block text-sm font-semibold text-gray-900 line-clamp-2 hover:text-gray-700 transition-colors mt-0.5"
                      >
                        {item.title}
                      </Link>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between gap-3 flex-wrap">
                    {/* Qty */}
                    <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className="text-[10px]" />
                      </button>
                      <span className="w-9 text-center text-sm font-semibold text-gray-900">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="text-[10px]" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">
                        Subtotal
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mt-2"
            >
              <FaArrowRight className="w-3 h-3 rotate-180" />
              <span>Continue shopping</span>
            </Link>
          </div>

          {/* ── Summary ─────────────────────────── */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-bold text-gray-900 mb-5">
                Order Summary
              </h2>

              {/* Promo code */}
              <div className="mb-5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <FaTag className="text-emerald-600 text-xs shrink-0" />
                      <span className="text-xs font-semibold text-emerald-800 truncate">
                        {appliedPromo.code} — {appliedPromo.label}
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="p-1 text-emerald-700 hover:text-emerald-900 transition-colors"
                      aria-label="Remove promo"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                        <input
                          type="text"
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && applyPromo()
                          }
                          placeholder="Promo code"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
                        />
                      </div>
                      <button
                        onClick={applyPromo}
                        className="bg-gray-900 text-white text-xs font-medium px-4 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-rose-600 mt-2">
                        {promoError}
                      </p>
                    )}
                    <p className="text-[11px] text-gray-400 mt-2">
                      Try <span className="font-mono">SAVE10</span> or{' '}
                      <span className="font-mono">SAVE20</span>
                    </p>
                  </>
                )}
              </div>

              {/* Lines */}
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      Discount ({appliedPromo.code})
                    </span>
                    <span className="font-medium text-emerald-600">
                      −${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Free shipping progress */}
              {shipping !== 0 && (
                <div className="mt-4">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          100,
                          ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    Add{' '}
                    <span className="font-semibold text-gray-900">
                      $
                      {(
                        FREE_SHIPPING_THRESHOLD -
                        (subtotal - discount)
                      ).toFixed(2)}
                    </span>{' '}
                    more for free shipping
                  </p>
                </div>
              )}

              {/* Checkout */}
              <button
                onClick={() => alert('Checkout page coming soon!')}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-3.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <span>Proceed to checkout</span>
                <FaArrowRight className="w-3 h-3" />
              </button>

              {/* Trust */}
              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                {[
                  { icon: <FaTruck />, text: 'Free shipping over $100' },
                  { icon: <FaUndo />, text: '30-day easy returns' },
                  { icon: <FaShieldAlt />, text: 'Secure checkout' },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <span className="text-gray-400">{r.icon}</span>
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Cart;