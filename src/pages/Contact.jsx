// src/pages/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 font-inter">
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We'd love to hear from you. Send us a message and we'll reply within 24 hours.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <textarea
            rows={5}
            placeholder="Your message"
            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Send message
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;