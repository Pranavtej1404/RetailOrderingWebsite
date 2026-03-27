import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Cart.css';

const CartSummary = ({ subtotal, showCheckoutButton = true }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/cart' } });
    }
  };

  return (
    <div className="cart-summary glass fade-in">
      <h2>Order Summary</h2>
      <div className="summary-details">
        <div className="summary-item">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="summary-item">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'free' : ''}>
            {shipping === 0 ? 'FREE' : `₹${shipping}`}
          </span>
        </div>
        <div className="summary-item">
          <span>Tax (GST 18%)</span>
          <span>₹{tax}</span>
        </div>
        <div className="summary-total">
          <span>Order Total</span>
          <span>₹{total}</span>
        </div>
      </div>
      {showCheckoutButton && (
        <button className="checkout-btn btn-primary" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      )}
      <div className="security-badges">
        <p><i className="fas fa-lock"></i> Secure Checkout</p>
        <p><i className="fas fa-shield-alt"></i> Buyer Protection</p>
      </div>
    </div>
  );
};

export default CartSummary;
