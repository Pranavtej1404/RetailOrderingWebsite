import React, { useState } from 'react';
import './Cart.css';

const CartItemCard = ({ item, onRemove, onUpdateQuantity }) => {
  const [qty, setQty] = useState(item.quantity);

  const handleUpdate = (newQty) => {
    if (newQty === 0) {
      if (onRemove) onRemove(item.id);
      return;
    }
    setQty(newQty);
    if (onUpdateQuantity) onUpdateQuantity(item.id, newQty);
  };

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
        <button className="qty-btn" onClick={() => handleUpdate(qty - 1)}>-</button>
        <span className="qty-val">{qty}</span>
        <button className="qty-btn" onClick={() => handleUpdate(qty + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        <p className="total-price">₹{item.price * qty}</p>
      </div>
      <button className="remove-btn" title="Remove Item" onClick={() => onRemove(item.id)}>
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default CartItemCard;
