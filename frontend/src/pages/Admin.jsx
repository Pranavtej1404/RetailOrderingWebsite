import React, { useState, useEffect } from 'react';
import ProductTable from '../components/admin/ProductTable';
import * as adminService from '../services/adminProductService';
import '../components/admin/Admin.css';

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
    <div className="container admin-container">
      <div className="admin-header">
        <h1>Inventory Management</h1>
        <button className="btn-primary">
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-box"></i></div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(76, 209, 55, 0.1)', color: '#4cd137' }}><i className="fas fa-shopping-bag"></i></div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Active Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(156, 136, 255, 0.1)', color: '#9c88ff' }}><i className="fas fa-users"></i></div>
          <div className="stat-info">
            <h3>156</h3>
            <p>Total Users</p>
          </div>
        </div>
      </div>

      <ProductTable products={products} />
    </div>
  );
};

export default Admin;
