import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { addCartItem } from '../services/cartService';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const cartId = localStorage.getItem('cartId');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const data = await addCartItem({ productId: product.id, quantity: qty }, cartId);
      if (data.cartId) {
        localStorage.setItem('cartId', data.cartId);
      }
      navigate('/cart');
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  if (loading) return <div className="container py-5 text-center"><h1>Loading Product...</h1></div>;
  if (!product) return <div className="container py-5 text-center"><h1>Product Not Found</h1></div>;

  const IMAGE_MAP = {
    'Pizza': '/assets/pizza.png',
    'Cold Drinks': '/assets/drinks.png',
    'Breads': '/assets/breads.png',
    'default': '/assets/pizza.png'
  };

  return (
    <div className="product-detail-wrapper">
      <div className="container product-detail-container fade-in">
        <div className="detail-image glass">
          <img src={IMAGE_MAP[product.categoryName] || IMAGE_MAP['default']} alt={product.name} />
        </div>

        <div className="detail-content">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/menu">Menu</Link> / {product.name}
          </nav>

          <h1>{product.name}</h1>
          <p className="price">₹{product.price}</p>

          <div className="stock-info">
            <span className={product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} items remaining` : 'Out of Stock'}
            </span>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
            <p className="brand-info">Brand: {product.brandName}</p>
          </div>

          <div className="purchase-options">
            <div className="quantity-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button className="add-to-cart-btn btn-primary" disabled={product.stockQuantity === 0} onClick={handleAddToCart}>
              {product.stockQuantity > 0 ? 'Add to Cart' : 'Sold Out'}
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
