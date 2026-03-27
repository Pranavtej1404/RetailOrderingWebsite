import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
// import { categories, brands } from '../data/mockData'; // Keeping for UI components if needed, or replace with real data
import './Menu.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // Real categories
  const [brands, setBrands] = useState([]); // Real brands

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes, brandRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/brands')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory)
    : products;

  return (
    <div className="menu-page-wrapper">
      <div className="container menu-layout">
        <Filter
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <main className="product-listing">
          <div className="listing-header">
            <h2>{selectedCategory ? categories.find(c => c.id === selectedCategory).name : 'All Products'}</h2>
            <p className="product-count">{filteredProducts.length} items found</p>
          </div>

          <div className="product-grid">
            {loading ? (
              <div className="loading-spinner">Loading products...</div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Menu;
