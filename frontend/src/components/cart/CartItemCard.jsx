import React from 'react';
import './Cart.css';

const CartItemCard = ({ item }) => {
  return (
    <div className="cart-item-card fade-in">
      <div className="cart-item-image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p className="unit-price">₹{item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <button className="qty-btn">-</button>
        <span className="qty-val">{item.quantity}</span>
        <button className="qty-btn">+</button>
      </div>
      <div className="cart-item-total">
        <p className="total-price">₹{item.price * item.quantity}</p>
      </div>
      <button className="remove-btn" title="Remove Item">
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default CartItemCard;
