import React, { useState, useContext, useMemo } from 'react';
import { SiteContext } from '../../context/SiteContext';
import { useCart } from '../../context/context/CartContext';
import DashboardLayout from './DashboardLayout';
import Button from '../../components/Button/Button';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { data } = useContext(SiteContext);
  const { cart } = useCart();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock admin data - will be replaced with Django backend
  const adminData = {
    stats: {
      totalOrders: 124,
      totalRevenue: 28450.75,
      activeUsers: 356,
      pendingOrders: 12,
      outOfStock: 3,
      averageOrderValue: 229.44
    },
    
    recentOrders: [
      { id: 'ORD-2024-124', customer: 'Alex Johnson', date: '2024-02-20', total: 48.76, status: 'processing' },
      { id: 'ORD-2024-123', customer: 'Maria Garcia', date: '2024-02-19', total: 32.45, status: 'shipped' },
      { id: 'ORD-2024-122', customer: 'James Wilson', date: '2024-02-19', total: 65.90, status: 'delivered' },
      { id: 'ORD-2024-121', customer: 'Sophie Park', date: '2024-02-18', total: 25.90, status: 'delivered' },
      { id: 'ORD-2024-120', customer: 'Robert Chen', date: '2024-02-18', total: 98.35, status: 'processing' }
    ],
    
    products: data?.products || [],
    
    users: [
      { id: 1, name: 'Alex Johnson', email: 'alex@example.com', joinDate: '2024-01-15', orders: 12, status: 'active' },
      { id: 2, name: 'Maria Garcia', email: 'maria@example.com', joinDate: '2024-01-20', orders: 8, status: 'active' },
      { id: 3, name: 'James Wilson', email: 'james@example.com', joinDate: '2024-02-01', orders: 3, status: 'active' },
      { id: 4, name: 'Sophie Park', email: 'sophie@example.com', joinDate: '2024-02-05', orders: 5, status: 'active' },
      { id: 5, name: 'Robert Chen', email: 'robert@example.com', joinDate: '2024-02-10', orders: 2, status: 'active' }
    ],
    
    salesData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4500]
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // Mock function - Replace with Django backend
    console.log(`Updating order ${orderId} to ${newStatus}`);
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleUpdateProduct = (productId, updates) => {
    // Mock function - Replace with Django backend
    console.log(`Updating product ${productId}:`, updates);
    alert(`Product ${productId} updated`);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Mock function - Replace with Django backend
      console.log(`Deleting product ${productId}`);
      alert(`Product ${productId} deleted`);
    }
  };

  const handleAddProduct = () => {
    // Mock function - Replace with Django backend
    console.log('Adding new product');
    alert('Add product form would open here');
  };

  const filteredOrders = useMemo(() => {
    return adminData.recentOrders.filter(order =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const outOfStockProducts = useMemo(() => {
    return adminData.products.filter(product => !product.available);
  }, [adminData.products]);

  return (
    <DashboardLayout active="admin">
      <div className="admin-dashboard">
        <header className="admin-header">
          <div className="header-content">
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">Manage your mushroom business</p>
          </div>
          
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search orders, products, users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
            <Button 
              variant="primary"
              onClick={handleAddProduct}
            >
              + Add Product
            </Button>
          </div>
        </header>

        {/* Admin Tabs */}
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="admin-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3 className="stat-value">${adminData.stats.totalRevenue.toLocaleString()}</h3>
                  <p className="stat-label">Total Revenue</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <h3 className="stat-value">{adminData.stats.totalOrders}</h3>
                  <p className="stat-label">Total Orders</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3 className="stat-value">{adminData.stats.activeUsers}</h3>
                  <p className="stat-label">Active Users</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3 className="stat-value">{adminData.stats.pendingOrders}</h3>
                  <p className="stat-label">Pending Orders</p>
                </div>
              </div>
              
              <div className="stat-card warning">
                <div className="stat-icon">⚠️</div>
                <div className="stat-content">
                  <h3 className="stat-value">{adminData.stats.outOfStock}</h3>
                  <p className="stat-label">Out of Stock</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3 className="stat-value">${adminData.stats.averageOrderValue}</h3>
                  <p className="stat-label">Avg Order Value</p>
                </div>
              </div>
            </div>

            {/* Recent Orders & Out of Stock */}
            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-header">
                  <h3 className="card-title">Recent Orders</h3>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => setActiveTab('orders')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="orders-list">
                  {adminData.recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <span className="order-id">{order.id}</span>
                        <span className="order-customer">{order.customer}</span>
                      </div>
                      <div className="order-details">
                        <span className="order-date">{order.date}</span>
                        <span className="order-total">${order.total}</span>
                        <span className={`order-status status-${order.status}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="overview-card">
                <div className="card-header">
                  <h3 className="card-title">Out of Stock</h3>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => setActiveTab('products')}
                  >
                    View All
                  </Button>
                </div>
                
                <div className="stock-list">
                  {outOfStockProducts.length > 0 ? (
                    outOfStockProducts.map((product) => (
                      <div key={product.id} className="stock-item">
                        <div className="product-info">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-thumb"
                          />
                          <div className="product-details">
                            <h4 className="product-name">{product.name}</h4>
                            <span className="product-price">{product.price}</span>
                          </div>
                        </div>
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={() => handleUpdateProduct(product.id, { available: true })}
                        >
                          Restock
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <p>All products are in stock! 🎉</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3 className="section-title">Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn" onClick={handleAddProduct}>
                  <span className="action-icon">➕</span>
                  <span className="action-text">Add New Product</span>
                </button>
                
                <button className="action-btn" onClick={() => setActiveTab('orders')}>
                  <span className="action-icon">📦</span>
                  <span className="action-text">Process Orders</span>
                </button>
                
                <button className="action-btn" onClick={() => window.print()}>
                  <span className="action-icon">📄</span>
                  <span className="action-text">Generate Report</span>
                </button>
                
                <button className="action-btn" onClick={() => alert('Email blast feature')}>
                  <span className="action-icon">📧</span>
                  <span className="action-text">Send Newsletter</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="admin-content">
            <div className="section-header">
              <h2 className="section-title">Order Management</h2>
              <div className="section-filters">
                <select className="filter-select">
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select className="filter-select">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="total-high">Total: High to Low</option>
                  <option value="total-low">Total: Low to High</option>
                </select>
              </div>
            </div>
            
            <div className="orders-table">
              <div className="table-header">
                <div className="table-cell">Order ID</div>
                <div className="table-cell">Customer</div>
                <div className="table-cell">Date</div>
                <div className="table-cell">Total</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Actions</div>
              </div>
              
              {filteredOrders.map((order) => (
                <div key={order.id} className="table-row">
                  <div className="table-cell">
                    <span className="order-id">{order.id}</span>
                  </div>
                  <div className="table-cell">{order.customer}</div>
                  <div className="table-cell">{order.date}</div>
                  <div className="table-cell">${order.total}</div>
                  <div className="table-cell">
                    <select 
                      className="status-select"
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button className="action-btn-small">View</button>
                      <button className="action-btn-small">Print</button>
                      <button className="action-btn-small danger">Cancel</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="admin-content">
            <div className="section-header">
              <h2 className="section-title">Product Management</h2>
              <Button 
                variant="primary"
                onClick={handleAddProduct}
              >
                + Add New Product
              </Button>
            </div>
            
            <div className="products-grid">
              {adminData.products.map((product) => (
                <div key={product.id} className="product-admin-card">
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-img"
                    />
                    {!product.available && (
                      <span className="stock-badge">Out of Stock</span>
                    )}
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-details">
                      <span className="product-price">{product.price}</span>
                      <span className={`product-status ${product.available ? 'in-stock' : 'out-of-stock'}`}>
                        {product.available ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    
                    <div className="product-actions">
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => handleUpdateProduct(product.id, { available: !product.available })}
                      >
                        {product.available ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </Button>
                      
                      <Button 
                        variant="secondary" 
                        size="small"
                        onClick={() => alert(`Edit product ${product.id}`)}
                      >
                        Edit
                      </Button>
                      
                      <Button 
                        variant="danger" 
                        size="small"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="admin-content">
            <div className="section-header">
              <h2 className="section-title">User Management</h2>
              <div className="user-stats">
                <span className="stat">Total: {adminData.users.length}</span>
                <span className="stat">Active: {adminData.users.filter(u => u.status === 'active').length}</span>
              </div>
            </div>
            
            <div className="users-table">
              <div className="table-header">
                <div className="table-cell">Name</div>
                <div className="table-cell">Email</div>
                <div className="table-cell">Join Date</div>
                <div className="table-cell">Orders</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Actions</div>
              </div>
              
              {adminData.users.map((user) => (
                <div key={user.id} className="table-row">
                  <div className="table-cell">
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <span className="user-name">{user.name}</span>
                    </div>
                  </div>
                  <div className="table-cell">{user.email}</div>
                  <div className="table-cell">{user.joinDate}</div>
                  <div className="table-cell">{user.orders}</div>
                  <div className="table-cell">
                    <span className={`user-status status-${user.status}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button className="action-btn-small">View</button>
                      <button className="action-btn-small">Message</button>
                      <button className="action-btn-small danger">Ban</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="admin-content">
            <div className="section-header">
              <h2 className="section-title">Business Analytics</h2>
              <select className="filter-select">
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="analytics-grid">
              <div className="analytics-card large">
                <h3 className="card-title">Revenue Trend</h3>
                <div className="chart-placeholder">
                  <p>📈 Revenue Chart will be here</p>
                  <div className="chart-bars">
                    {adminData.salesData.data.map((value, index) => (
                      <div 
                        key={index} 
                        className="chart-bar"
                        style={{ height: `${value / 100}px` }}
                        title={`${adminData.salesData.labels[index]}: $${value}`}
                      >
                        <span className="chart-label">{adminData.salesData.labels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="analytics-card">
                <h3 className="card-title">Top Products</h3>
                <div className="top-products">
                  {adminData.products.slice(0, 3).map((product, index) => (
                    <div key={product.id} className="top-product">
                      <span className="rank">{index + 1}</span>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-thumb"
                      />
                      <div className="product-stats">
                        <span className="product-name">{product.name}</span>
                        <span className="product-sales">42 orders</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="analytics-card">
                <h3 className="card-title">Order Sources</h3>
                <div className="sources-list">
                  <div className="source-item">
                    <span className="source-name">Website</span>
                    <span className="source-percentage">65%</span>
                    <div className="source-bar">
                      <div className="bar-fill" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="source-item">
                    <span className="source-name">Mobile App</span>
                    <span className="source-percentage">25%</span>
                    <div className="source-bar">
                      <div className="bar-fill" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="source-item">
                    <span className="source-name">Phone Orders</span>
                    <span className="source-percentage">10%</span>
                    <div className="source-bar">
                      <div className="bar-fill" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="analytics-card">
                <h3 className="card-title">Customer Retention</h3>
                <div className="retention-stats">
                  <div className="retention-item">
                    <span className="retention-value">85%</span>
                    <span className="retention-label">Repeat Customers</span>
                  </div>
                  <div className="retention-item">
                    <span className="retention-value">4.8</span>
                    <span className="retention-label">Avg Rating</span>
                  </div>
                  <div className="retention-item">
                    <span className="retention-value">92%</span>
                    <span className="retention-label">Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;