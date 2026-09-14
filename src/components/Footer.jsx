// src/components/Footer.jsx
import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send to your API / mailing list
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const columns = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Best Sellers', href: '#' },
        { name: 'Sale', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'Contact Us', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Licenses', href: '#' },
      ],
    },
  ];

  const socials = [
    { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top: brand + link columns ────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 py-14">

          {/* Brand block — spans 2 cols */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
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
              <span className="text-lg font-bold text-gray-900">Webstore</span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
              Curated products, delivered fast. Discover quality finds across
              electronics, fashion, and everyday essentials — all in one place.
            </p>

            {/* Contact info */}
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-gray-400 text-xs" />
                <span>123 Market Street, Phnom Penh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-gray-400 text-xs" />
                <a
                  href="mailto:hello@webstore.com"
                  className="hover:text-gray-900 transition-colors"
                >
                  hello@webstore.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-gray-400 text-xs" />
                <a
                  href="tel:+855000000000"
                  className="hover:text-gray-900 transition-colors"
                >
                  +855 000 000 000
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ───────────────────────────── */}
        <div className="border-t border-gray-100 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-gray-500">
                Get 10% off your first order and early access to new arrivals.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch gap-2 w-full lg:w-auto"
            >
              <div className="relative flex-1 sm:w-72">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-4 py-2.5 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                {!subscribed && <FaArrowRight className="w-3 h-3" />}
              </button>
            </form>
          </div>

          {subscribed && (
            <p className="text-xs text-emerald-600 mt-3">
              Thanks! Check your inbox to confirm your subscription.
            </p>
          )}
        </div>

        {/* ── Bottom bar ───────────────────────────── */}
        <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 order-2 sm:order-1">
            © {new Date().getFullYear()} Webstore. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-1 order-1 sm:order-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-sm">{s.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;