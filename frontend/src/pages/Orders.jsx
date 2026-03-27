import React from 'react';
import OrderCard from '../components/orders/OrderCard';
import { mockOrders } from '../data/mockData';
import '../components/orders/Orders.css';

const Orders = () => {
  return (
    <div className="container orders-container">
      <h1>My Orders</h1>
      {mockOrders.length > 0 ? (
        <div className="orders-list">
          {mockOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="empty-orders glass center-text" style={{padding: '60px'}}>
          <i className="fas fa-history" style={{fontSize: '60px', color: 'var(--border)', marginBottom: '20px', display: 'block'}}></i>
          <h2>No Orders Yet</h2>
          <p style={{marginBottom: '20px'}}>You haven't placed any orders with us yet.</p>
          <a href="/menu" className="btn-primary">Order Now</a>
        </div>
      )}
    </div>
  );
};

export default Orders;
