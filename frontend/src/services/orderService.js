import api from './api';

const ORDER_PREFIX = '/orders';

export const getOrders = async () => {
  const response = await api.get(ORDER_PREFIX);
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`${ORDER_PREFIX}/${orderId}`);
  return response.data;
};

export const placeOrder = async (payload, cartId) => {
  const headers = cartId ? { 'X-Cart-Id': cartId } : {};
  const response = await api.post(ORDER_PREFIX, payload, { headers });
  return response.data;
};
