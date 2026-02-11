import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Total Orders', value: '12', icon: '📦' },
    { label: 'Pending', value: '2', icon: '⏳' },
    { label: 'Delivered', value: '10', icon: '✓' },
    { label: 'Total Spent', value: '$284.50', icon: '💰' }
  ];

  const recentOrders = [
    { id: 'ORD-2024-015', date: '2024-02-20', total: '$32.45', status: 'Processing' },
    { id: 'ORD-2024-014', date: '2024-02-18', total: '$48.76', status: 'Delivered' },
    { id: 'ORD-2024-013', date: '2024-02-15', total: '$25.90', status: 'Delivered' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        <div className="sidebar__header">
          <div className="sidebar__avatar">
            {user?.firstName?.[0] || user?.email[0].toUpperCase()}
          </div>
          <div className="sidebar__user-info">
            <h3 className="sidebar__username">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
            </h3>
            <p className="sidebar__email">{user?.email}</p>
          </div>
        </div>
        
        <nav className="sidebar__nav">
          <Link to="/dashboard" className="sidebar__link active">
            <span className="sidebar__icon">📊</span>
            Dashboard
          </Link>
          <Link to="/dashboard/orders" className="sidebar__link">
            <span className="sidebar__icon">📦</span>
            My Orders
          </Link>
          <Link to="/dashboard/profile" className="sidebar__link">
            <span className="sidebar__icon">👤</span>
            Profile
          </Link>
          <Link to="/dashboard/settings" className="sidebar__link">
            <span className="sidebar__icon">⚙️</span>
            Settings
          </Link>
          {user?.isAdmin && (
            <Link to="/dashboard/admin" className="sidebar__link">
              <span className="sidebar__icon">👑</span>
              Admin Panel
            </Link>
          )}
        </nav>
        
        <div className="sidebar__footer">
          <Button 
            variant="primary" 
            className="sidebar__order-btn"
            onClick={() => window.location.href = '/products'}
          >
            Order Mushrooms
          </Button>
        </div>
      </div>
      
      <div className="dashboard__main">
        <header className="dashboard__header">
          <div className="header__content">
            <h1 className="dashboard__title">Dashboard</h1>
            <p className="dashboard__subtitle">
              Welcome back! Here's what's happening with your account.
            </p>
          </div>
          <div className="header__actions">
            <Button 
              variant="secondary"
              onClick={() => window.location.href = '/products'}
            >
              Shop Now
            </Button>
          </div>
        </header>
        
        <div className="dashboard__content">
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-card__icon">{stat.icon}</div>
                <div className="stat-card__content">
                  <h3 className="stat-card__value">{stat.value}</h3>
                  <p className="stat-card__label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recent Orders */}
          <div className="dashboard__section">
            <div className="section__header">
              <h2 className="section__title">Recent Orders</h2>
              <Link to="/dashboard/orders" className="section__link">
                View All →
              </Link>
            </div>
            
            <div className="orders-table">
              <div className="table__header">
                <div className="table__cell">Order ID</div>
                <div className="table__cell">Date</div>
                <div className="table__cell">Total</div>
                <div className="table__cell">Status</div>
                <div className="table__cell">Actions</div>
              </div>
              
              {recentOrders.map((order) => (
                <div key={order.id} className="table__row">
                  <div className="table__cell">
                    <span className="order-id">{order.id}</span>
                  </div>
                  <div className="table__cell">{order.date}</div>
                  <div className="table__cell">{order.total}</div>
                  <div className="table__cell">
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="table__cell">
                    <button className="table__action">View</button>
                    <button className="table__action">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="dashboard__section">
            <h2 className="section__title">Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-card">
                <span className="action-card__icon">📝</span>
                <span className="action-card__text">Update Profile</span>
              </button>
              <button className="action-card">
                <span className="action-card__icon">📍</span>
                <span className="action-card__text">Change Address</span>
              </button>
              <button className="action-card">
                <span className="action-card__icon">🔒</span>
                <span className="action-card__text">Change Password</span>
              </button>
              <button className="action-card">
                <span className="action-card__icon">📧</span>
                <span className="action-card__text">Contact Support</span>
              </button>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="dashboard__section">
            <h2 className="section__title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-item__icon">✓</div>
                <div className="activity-item__content">
                  <p className="activity-item__text">Order #ORD-2024-015 placed</p>
                  <span className="activity-item__time">2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-item__icon">📧</div>
                <div className="activity-item__content">
                  <p className="activity-item__text">Password changed successfully</p>
                  <span className="activity-item__time">1 day ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-item__icon">⭐</div>
                <div className="activity-item__content">
                  <p className="activity-item__text">Left a review for Pearl Oyster</p>
                  <span className="activity-item__time">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;