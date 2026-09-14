// src/hooks/useWishlistCount.js
import { useEffect, useState } from 'react';
import { getWishlistCount, subscribeWishlist } from '../utils/wishlist';

export const useWishlistCount = () => {
  const [count, setCount] = useState(getWishlistCount);

  useEffect(() => {
    const unsubscribe = subscribeWishlist(setCount);
    return unsubscribe;
  }, []);

  return count;
};
