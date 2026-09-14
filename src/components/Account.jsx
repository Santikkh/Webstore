// src/pages/Account.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaBox,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaHeart,
  FaShoppingBag,
  FaCheck,
  FaTimes,
  FaTruck,
  FaStar,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const TABS = [
  { id: 'profile', label: 'Profile', icon: <FaUser /> },
  { id: 'orders', label: 'Orders', icon: <FaBox /> },
  { id: 'addresses', label: 'Addresses', icon: <FaMapMarkerAlt /> },
  { id: 'settings', label: 'Settings', icon: <FaCog /> },
];

/* Demo data — replace with real user/API data later */
const DEMO_USER = {
  firstName: 'Alex',
  lastName: 'Johnson',
  username: 'alexj',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  joined: 'March 2024',
};

const DEMO_ORDERS = [
  {
    id: 'ORD-1042',
    date: 'Aug 12, 2024',
    status: 'Delivered',
    total: 149.97,
    items: 3,
  },
  {
    id: 'ORD-1038',
    date: 'Jul 28, 2024',
    status: 'In transit',
    total: 89.5,
    items: 2,
  },
  {
    id: 'ORD-1021',
    date: 'Jun 15, 2024',
    status: 'Delivered',
    total: 220.0,
    items: 4,
  },
];

const DEMO_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    default: true,
    name: 'Alex Johnson',
    street: '123 Market Street',
    city: 'San Francisco',
    zip: '94103',
    country: 'United States',
  },
  {
    id: 2,
    label: 'Work',
    default: false,
    name: 'Alex Johnson',
    street: '500 Howard Street, Suite 400',
    city: 'San Francisco',
    zip: '94105',
    country: 'United States',
  },
];

const STATUS_STYLES = {
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'In transit': 'bg-amber-50 text-amber-700 border-amber-100',
  Processing: 'bg-sky-50 text-sky-700 border-sky-100',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
};

const Account = () => {
  const { count: cartCount } = useCart();

  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    firstName: DEMO_USER.firstName,
    lastName: DEMO_USER.lastName,
    username: DEMO_USER.username,
    email: DEMO_USER.email,
    phone: DEMO_USER.phone,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: POST to your API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = `${form.firstName?.[0] ?? ''}${
    form.lastName?.[0] ?? ''
  }`.toUpperCase();

  return (
    <div className="min-h-full bg-gray-50 font-inter">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-900" />
            My account
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Account
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Manage your profile, orders, and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Sidebar ─────────────────────────── */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 lg:sticky lg:top-24">
              {/* Avatar + name */}
              <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-5">
                <div className="h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {initials || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {form.firstName} {form.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    @{form.username}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Sign out */}
              <button
                onClick={() => alert('Sign out (demo)')}
                className="mt-5 pt-5 border-t border-gray-100 w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors duration-200"
              >
                <FaSignOutAlt className="text-xs" />
                <span>Sign out</span>
              </button>
            </div>

            {/* Quick links */}
            <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-5 hidden lg:block">
              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-gray-500 mb-3">
                Quick links
              </p>
              <div className="space-y-1">
                <Link
                  to="/wishlist"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaHeart className="text-xs text-gray-400" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaShoppingBag className="text-xs text-gray-400" />
                  <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Content ─────────────────────────── */}
          <section className="lg:col-span-3">
            {/* Profile tab */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Profile information
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Update your personal details.
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    Member since {DEMO_USER.joined}
                  </span>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="First name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="Username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200 ${
                        saved
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {saved ? (
                        <>
                          <FaCheck className="text-xs" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <span>Save changes</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          firstName: DEMO_USER.firstName,
                          lastName: DEMO_USER.lastName,
                          username: DEMO_USER.username,
                          email: DEMO_USER.email,
                          phone: DEMO_USER.phone,
                        })
                      }
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Orders tab */}
            {activeTab === 'orders' && (
              <div className="space-y-3">
                {DEMO_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <FaBox className="text-gray-500 text-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {order.id}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {order.date} • {order.items} item
                            {order.items === 1 ? '' : 's'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full border ${
                            STATUS_STYLES[order.status] ||
                            'bg-gray-50 text-gray-600 border-gray-100'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                      <button className="text-xs font-medium text-gray-900 hover:text-gray-700 transition-colors">
                        View details
                      </button>
                      <span className="text-gray-200">•</span>
                      <button className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        Track package
                      </button>
                      <span className="text-gray-200">•</span>
                      <button className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        Buy again
                      </button>
                    </div>
                  </div>
                ))}

                {DEMO_ORDERS.length === 0 && (
                  <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center">
                    <FaBox className="text-2xl text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900">
                      No orders yet
                    </p>
                    <p className="text-xs text-gray-500 mt-1 mb-5">
                      Your past orders will appear here.
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Start shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Addresses tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Saved addresses
                  </h2>
                  <button className="inline-flex items-center gap-2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    + Add new
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DEMO_ADDRESSES.map((addr) => (
                    <div
                      key={addr.id}
                      className="relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors"
                    >
                      {addr.default && (
                        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wide font-semibold bg-gray-900 text-white px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}

                      <div className="flex items-center gap-2 mb-3">
                        <span className="h-7 w-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-gray-500 text-xs" />
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {addr.label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700">{addr.name}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {addr.street}
                        <br />
                        {addr.city} {addr.zip}
                        <br />
                        {addr.country}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                        <button className="text-xs font-medium text-gray-900 hover:text-gray-700 transition-colors">
                          Edit
                        </button>
                        <span className="text-gray-200">•</span>
                        {!addr.default && (
                          <>
                            <button className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                              Set default
                            </button>
                            <span className="text-gray-200">•</span>
                          </>
                        )}
                        <button className="text-xs font-medium text-rose-500 hover:text-rose-700 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings tab */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Settings</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Manage notifications and preferences.
                  </p>
                </div>

                <div className="space-y-1">
                  {[
                    {
                      id: 'newsletter',
                      label: 'Newsletter',
                      desc: 'Receive weekly deals and new arrivals.',
                      defaultOn: true,
                    },
                    {
                      id: 'orderUpdates',
                      label: 'Order updates',
                      desc: 'Get notified about shipping and delivery.',
                      defaultOn: true,
                    },
                    {
                      id: 'promotions',
                      label: 'Promotions',
                      desc: 'Occasional promotional emails.',
                      defaultOn: false,
                    },
                    {
                      id: 'sms',
                      label: 'SMS notifications',
                      desc: 'Order status updates via text message.',
                      defaultOn: false,
                    },
                  ].map((row) => (
                    <ToggleRow key={row.id} {...row} />
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Danger zone
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Once deleted, your account and data cannot be recovered.
                  </p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg hover:bg-rose-100 transition-colors">
                    Delete account
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

/* ── Small subcomponents ─────────────────────── */

const Field = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-xs font-semibold text-gray-700 mb-1.5"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
    />
  </div>
);

const ToggleRow = ({ label, desc, defaultOn }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${
          on ? 'bg-gray-900' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            on ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Account;