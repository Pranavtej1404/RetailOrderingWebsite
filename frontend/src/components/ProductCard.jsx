import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 1 }
    });
    navigate('/cart');
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
          <button className="add-to-cart btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
