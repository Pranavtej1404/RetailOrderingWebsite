import api from './api';

const CART_PREFIX = '/cart';

export const getCart = async (cartId) => {
  const params = cartId ? { cartId } : {};
  const response = await api.get(CART_PREFIX, { params });
  return response.data;
};

export const addCartItem = async (payload, cartId) => {
  const params = cartId ? { cartId } : {};
  const response = await api.post(`${CART_PREFIX}/items`, payload, { params });
  return response.data;
};

export const updateCartItem = async (itemId, payload, cartId) => {
  const params = cartId ? { cartId } : {};
  const response = await api.put(`${CART_PREFIX}/items/${itemId}`, payload, { params });
  return response.data;
};

export const deleteCartItem = async (itemId, cartId) => {
  const params = cartId ? { cartId } : {};
  const response = await api.delete(`${CART_PREFIX}/items/${itemId}`, { params });
  return response.data;
};
