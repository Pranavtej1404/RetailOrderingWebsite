import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setAdding(true);
      await addToCart(product, 1);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card fade-in">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
        <span className="stock-badge">{product.stock} in stock</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="price">₹{product.price}</span>
          <button 
            className="add-to-cart btn-primary" 
            onClick={handleAddToCart}
            disabled={product.stock === 0 || adding}
          >
            {product.stock === 0 ? 'Sold Out' : (adding ? 'Adding...' : 'Add to Cart')}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
