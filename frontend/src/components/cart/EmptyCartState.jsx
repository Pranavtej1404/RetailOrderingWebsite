import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const EmptyCartState = () => {
  return (
    <div className="empty-cart-state fade-in">
      <div className="empty-icon">
        <i className="fas fa-shopping-basket"></i>
      </div>
      <h2>Your Cart is Empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
      <Link to="/menu" className="btn-primary">
        Browse Menu
      </Link>
    </div>
  );
};

export default EmptyCartState;
