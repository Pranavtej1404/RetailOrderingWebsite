import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];

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
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className="add-to-cart-btn btn-primary" disabled={product.stock === 0}>
              {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
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
