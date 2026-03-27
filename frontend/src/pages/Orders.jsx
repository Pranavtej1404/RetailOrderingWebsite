import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="container mt-5">Loading orders...</div>;
  if (error) return <div className="container mt-5" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container mt-5 orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <div>
          <p>You haven't placed any orders yet.</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
          {orders.map(order => (
            <li key={order.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Order #{order.id}</strong>
                <span style={{ padding: '0.2rem 0.5rem', background: '#e0e0e0', borderRadius: '4px' }}>
                  {order.status || 'PROCESSING'}
                </span>
              </div>
              <div>
                <p style={{ margin: '0.2rem 0' }}><strong>Total:</strong> ₹{order.totalAmount || 0}</p>
                <p style={{ margin: '0.2rem 0' }}><strong>Placed On:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                <p style={{ margin: '0.2rem 0' }}><strong>Address:</strong> {order.deliveryAddress}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
