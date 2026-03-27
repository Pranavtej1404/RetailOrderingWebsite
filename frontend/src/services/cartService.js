import api from './api';

const CART_PREFIX = '/cart';

export const getCart = async (cartId) => {
  const headers = cartId ? { 'X-Cart-Id': cartId } : {};
  const response = await api.get(CART_PREFIX, { headers });
  return response.data;
};

export const addCartItem = async (payload, cartId) => {
  const headers = cartId ? { 'X-Cart-Id': cartId } : {};
  const response = await api.post(`${CART_PREFIX}/items`, payload, { headers });
  return response.data;
};

export const updateCartItem = async (itemId, payload, cartId) => {
  const headers = cartId ? { 'X-Cart-Id': cartId } : {};
  const response = await api.put(`${CART_PREFIX}/items/${itemId}`, payload, { headers });
  return response.data;
};

export const deleteCartItem = async (itemId, cartId) => {
  const headers = cartId ? { 'X-Cart-Id': cartId } : {};
  const response = await api.delete(`${CART_PREFIX}/items/${itemId}`, { headers });
  return response.data;
};
