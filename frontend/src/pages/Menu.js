import React, { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';

const Menu = () => {
  const { filteredProducts, loading, error, setFilter, filter, refreshProducts } = useProducts();

  // If we needed data to be fresh, we could refresh it here
  // useEffect(() => { refreshProducts(); }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="menu-container">
      <h1>Product Menu</h1>
      
      {/* Filter UI - Minimal (Functional logic for Member 4) */}
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
        <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Drinks">Drinks</option>
          <option value="Breads">Breads</option>
        </select>
      </div>

      {/* Product List - Minimal (Member 3 to style later) */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card-placeholder">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>${product.price}</span>
              <span> Stock: {product.stock}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
