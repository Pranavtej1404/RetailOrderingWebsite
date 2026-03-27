import axiosInstance from './axios';

const PRODUCT_API = '/products';

const ProductService = {
  getProducts: async () => {
    try {
      const response = await axiosInstance.get(PRODUCT_API);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`${PRODUCT_API}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },
};

export default ProductService;
