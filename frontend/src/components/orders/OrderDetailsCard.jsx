import React from 'react';
import './Orders.css';

const OrderDetailsCard = ({ order }) => {
  return (
    <div className="order-details-card">
      <div className="order-items-list">
        <h4>Items Ordered</h4>
        {order.items.map(item => (
          <div key={item.id} className="order-item-row">
            <div className="item-name-qty">
              <span className="item-qty">{item.quantity}x</span>
              <span className="item-name">{item.name}</span>
            </div>
            <span className="item-price">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      
      <div className="delivery-info-block">
        <div className="address-section">
          <h4>Delivery Address</h4>
          <p>{order.address}</p>
        </div>
        <div className="payment-section">
          <h4>Payment Method</h4>
          <p>Cash on Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
