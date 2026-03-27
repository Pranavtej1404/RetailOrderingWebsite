import React, { useState } from 'react';
import OrderDetailsCard from './OrderDetailsCard';
import './Orders.css';

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-card fade-in">
      <div className="order-card-header">
        <div className="order-meta">
          <span className="order-id">#{order.orderId || order.id}</span>
          <span className="order-date">{formatDate(order.orderDate)}</span>
        </div>
        <div className={`status-badge ${order.status.toLowerCase()}`}>
          {order.status.replace('_', ' ')}
        </div>
      </div>
      <div className="order-card-body">
        <div className="order-summary-info">
          <div className="info-item">
            <span className="info-label">Items</span>
            <span className="info-value">{order.items.length} Products</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Amount</span>
            <span className="info-value">₹{order.totalAmount}</span>
          </div>
        </div>
        <button
          className="btn-outline view-details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      {showDetails && (
        <div className="order-details-expanded fade-in">
          <OrderDetailsCard order={order} />
        </div>
      )}
    </div>
  );
};

export default OrderCard;
