// src/pages/Home.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FeatureProducts from '../components/FeatureProducts';
import SlideShow from '../components/SlideShow';
import ProductGrid from '../components/ProductGrid';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <SlideShow />
      <FeatureProducts />
      
    </div>
  );
};

export default Home;
