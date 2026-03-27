import React, { useEffect, useState } from 'react';
import * as adminService from '../services/adminProductService';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAdminProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products for admin:', err);
      setError('Failed to load products. You may not have administrative privileges.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleUpdateStock = async (id, currentStock) => {
    const newStock = prompt(`Enter new stock quantity for Product ${id} (Current: ${currentStock}):`);
    if (newStock === null || newStock === '') return;
    try {
      await adminService.updateStock(id, { stockQuantity: parseInt(newStock) });
      await loadProducts(); // Refresh list
    } catch (err) {
      alert('Failed to update stock: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Failed to delete product: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="container mt-5">Loading Admin Dashboard...</div>;
  if (error) return <div className="container mt-5" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="container mt-5 admin-page">
      <h1>Admin Dashboard</h1>
      <p>Management interface for administrators.</p>
      
      <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={{ padding: '0.8rem', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '0.8rem', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '0.8rem', border: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '0.8rem', border: '1px solid #ddd' }}>Stock</th>
            <th style={{ padding: '0.8rem', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{product.id}</td>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>₹{product.price}</td>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                <span className={product.stock === 0 ? 'out-of-stock' : ''}>{product.stock}</span>
              </td>
              <td style={{ padding: '0.8rem', border: '1px solid #ddd' }}>
                <button 
                  onClick={() => handleUpdateStock(product.id, product.stock)}
                  className="btn-secondary"
                  style={{ marginRight: '0.5rem', background: '#ccc', color: '#000', padding: '0.4rem 0.8rem' }}
                >
                  Update Stock
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="btn-secondary"
                  style={{ background: '#ff4d4d', color: 'white', padding: '0.4rem 0.8rem', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
