import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Checkout.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-1234';

  return (
    <div className="container center-container fade-in">
      <div className="order-success-card glass">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order ID: <strong>{orderId}</strong></p>
        <p className="message">
          Thank you for your order. We've received it and will start preparing it soon.
          You will receive a confirmation email shortly.
        </p>
        
        <div className="confirmation-actions">
          <Link to="/orders" className="btn-primary">View My Orders</Link>
          <Link to="/menu" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>

      <style>{`
        .center-container {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .order-success-card {
          padding: 60px;
          border-radius: var(--radius-lg);
          max-width: 600px;
          width: 100%;
        }
        .success-icon {
          font-size: 80px;
          color: #4cd137;
          margin-bottom: 24px;
        }
        .order-success-card h1 {
          margin-bottom: 16px;
        }
        .order-id {
          font-size: 18px;
          margin-bottom: 24px;
          color: var(--text-muted);
        }
        .message {
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .confirmation-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        @media (max-width: 576px) {
          .confirmation-actions {
            flex-direction: column;
          }
          .order-success-card {
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
