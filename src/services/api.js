// src/services/api.js

const BASE_URL = 'https://fakestoreapi.com';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) message = errorBody.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const productsApi = {
  getAll: () => request('/products'),
  getById: (id) => request(`/products/${id}`),
  getCategories: () => request('/products/categories'),
  getByCategory: (category) =>
    request(`/products/category/${encodeURIComponent(category)}`),
  create: (product) =>
    request('/products', { method: 'POST', body: JSON.stringify(product) }),
  update: (id, product) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

export const cartsApi = {
  getAll: () => request('/carts'),
  getById: (id) => request(`/carts/${id}`),
  getUserCarts: (userId) => request(`/carts/user/${userId}`),
  create: (cart) =>
    request('/carts', { method: 'POST', body: JSON.stringify(cart) }),
  update: (id, cart) =>
    request(`/carts/${id}`, { method: 'PUT', body: JSON.stringify(cart) }),
  remove: (id) => request(`/carts/${id}`, { method: 'DELETE' }),
};

export const usersApi = {
  getAll: () => request('/users'),
  getById: (id) => request(`/users/${id}`),
};

export default { products: productsApi, carts: cartsApi, users: usersApi };