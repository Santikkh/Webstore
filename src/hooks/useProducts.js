// src/hooks/useProducts.js
import { useCallback, useEffect, useState } from 'react';
import { productsApi } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default'); // default | price-asc | price-desc | rating

  // Load all products + categories once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [items, cats] = await Promise.all([
          productsApi.getAll(),
          productsApi.getCategories(),
        ]);
        if (!cancelled) {
          setProducts(items);
          setCategories(cats);
        }
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

  const retry = useCallback(() => {
    setError(null);
    setLoading(true);
    productsApi
      .getAll()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Derived: filtered + sorted list
  const filtered = products
    .filter((p) => (category === 'all' ? true : p.category === category))
    .filter((p) =>
      query.trim() === ''
        ? true
        : p.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating')
        return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      return 0;
    });

  return {
    products,
    filtered,
    categories,
    loading,
    error,
    retry,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
  };
}
