import React from 'react';
import OrderCard from '../components/orders/OrderCard';
import { mockOrders } from '../data/mockData';
import '../components/orders/Orders.css';

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
