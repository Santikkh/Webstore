// src/utils/wishlist.js
const WISHLIST_KEY = 'webstore:wishlist';

export const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
};

export const writeWishlist = (ids) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    // Notify same-tab listeners
    window.dispatchEvent(new Event('wishlist:change'));
  } catch {
    /* ignore */
  }
};

export const isWishlisted = (id) => readWishlist().includes(Number(id));

export const toggleWishlist = (id) => {
  const pid = Number(id);
  const ids = readWishlist();
  const next = ids.includes(pid) ? ids.filter((x) => x !== pid) : [...ids, pid];
  writeWishlist(next);
  return next.includes(pid);
};

export const removeFromWishlist = (id) => {
  const pid = Number(id);
  const next = readWishlist().filter((x) => x !== pid);
  writeWishlist(next);
  return next;
};

export const clearWishlist = () => writeWishlist([]);

export const getWishlistCount = () => readWishlist().length;

/* Subscribe to wishlist changes in the same tab AND across tabs.
   Returns an unsubscribe function. */
export const subscribeWishlist = (callback) => {
  const handler = () => callback(getWishlistCount());

  window.addEventListener('wishlist:change', handler);
  window.addEventListener('storage', handler); // fires in OTHER tabs

  return () => {
    window.removeEventListener('wishlist:change', handler);
    window.removeEventListener('storage', handler);
  };
};