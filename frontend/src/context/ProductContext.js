import { createContext, useState, useEffect, useContext } from 'react';
import ProductService from '../api/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ category: '', brand: '', search: '' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filter.search.toLowerCase());
    const matchesCategory = filter.category ? product.category === filter.category : true;
    const matchesBrand = filter.brand ? product.brand === filter.brand : true;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <ProductContext.Provider value={{ 
      products, 
      filteredProducts, 
      loading, 
      error, 
      filter, 
      setFilter, 
      refreshProducts: fetchProducts 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext;
