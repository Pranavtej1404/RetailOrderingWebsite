import React from 'react';
import './Filter.css';

const Filter = ({ categories, brands, selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="filter-sidebar glass">
      <div className="filter-section">
        <h3>Categories</h3>
        <ul>
          <li 
            className={selectedCategory === null ? 'active' : ''} 
            onClick={() => setSelectedCategory(null)}
          >
            All Products
          </li>
          {categories.map(cat => (
            <li 
              key={cat.id} 
              className={selectedCategory === cat.id ? 'active' : ''} 
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Brands</h3>
        <ul>
          {brands.map(brand => (
            <li key={brand.id}>
              <label>
                <input type="checkbox" name="brand" value={brand.id} />
                {brand.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="filter-section">
        <h3>Price Range</h3>
        <input type="range" min="0" max="1000" step="50" />
      </div>
    </aside>
  );
};

export default Filter;
