import React, { useState } from 'react';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import { products, categories, brands } from '../data/mockData';
import './Menu.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
            {filteredProducts.length > 0 ? (
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
