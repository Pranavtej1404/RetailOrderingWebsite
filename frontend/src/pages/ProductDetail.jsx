import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // If product not found from mockData, redirect or handle, but for now fallback to 0 isn't safe if we add to cart
  if (!product) {
    return <div className="container mt-5">Product not found <Link to="/menu">Go back</Link></div>;
  }

  return (
    <div className="product-detail-wrapper">
      <div className="container product-detail-container fade-in">
        <div className="detail-image glass">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="detail-content">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/menu">Menu</Link> / {product.name}
          </nav>
          
          <h1>{product.name}</h1>
          <p className="price">₹{product.price}</p>
          
          <div className="stock-info">
            <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stock > 0 ? `${product.stock} items remaining` : 'Out of Stock'}
            </span>
          </div>
          
          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="purchase-options">
            <div className="quantity-selector">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={product.stock === 0}
              >-</button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                disabled={product.stock === 0}
              >+</button>
            </div>
            <button 
              className="add-to-cart-btn btn-primary" 
              disabled={product.stock === 0 || adding}
              onClick={async () => {
                setAdding(true);
                await addToCart(product, quantity);
                setAdding(false);
                // navigate('/cart'); // Optional: redirect to cart after adding
              }}
            >
              {product.stock === 0 ? 'Sold Out' : (adding ? 'Adding...' : 'Add to Cart')}
            </button>
          </div>
          
          <div className="extra-info">
            <p><i className="fas fa-truck"></i> Free delivery on orders above ₹500</p>
            <p><i className="fas fa-undo"></i> 30-day easy return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
