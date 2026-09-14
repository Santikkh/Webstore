// src/pages/Products.jsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductGrid from '../components/ProductGrid';

const Products = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';

 

  return (
    <div className="bg-gray-50 font-inter">
      <ProductGrid/>
    </div>
  );
};

export default Products;