import { Link, useNavigate } from 'react-router-dom';
import { addCartItem } from '../services/cartService';
import './ProductCard.css';

const IMAGE_MAP = {
  'Pizza': '/assets/pizza.png',
  'Cold Drinks': '/assets/drinks.png',
  'Breads': '/assets/breads.png',
  'default': '/assets/pizza.png'
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const cartId = localStorage.getItem('cartId');

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const data = await addCartItem({ productId: product.id, quantity: 1 }, cartId);
      if (data.cartId) {
        localStorage.setItem('cartId', data.cartId);
      }
      navigate('/cart');
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      // Maybe show a toast or alert
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card fade-in">
      <div className="product-image">
        <img src={IMAGE_MAP[product.categoryName] || IMAGE_MAP['default']} alt={product.name} />
        <span className="stock-badge">{product.stockQuantity || product.stock} in stock</span>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="price">₹{product.price}</span>
          <button className="add-to-cart btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
