import api from './api';

const ADMIN_PRODUCTS_PREFIX = '/admin/products';

export const getAdminProducts = async () => {
  // Can just reuse the public products API or if there's an admin one:
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (payload) => {
  const response = await api.post(ADMIN_PRODUCTS_PREFIX, payload);
  return response.data;
};

export const updateProduct = async (id, payload) => {
  const response = await api.put(`${ADMIN_PRODUCTS_PREFIX}/${id}`, payload);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`${ADMIN_PRODUCTS_PREFIX}/${id}`);
  return response.data;
};

export const updateStock = async (id, payload) => {
  // StockUpdateRequest expects { stockQuantity }
  const response = await api.patch(`${ADMIN_PRODUCTS_PREFIX}/${id}/stock`, payload);
  return response.data;
};
