// src/pages/About.jsx
import React, { useState } from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 font-inter">
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-gray-600 leading-relaxed">
          Webstore is a modern e-commerce demo built with React, React Router,
          and Tailwind CSS.
        </p>
      </main>
    </div>
  );
};

export default About;