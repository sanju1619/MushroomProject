import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import './DashboardLayout.css';

const DashboardLayout = ({ children, active }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/orders', label: 'My Orders', icon: '📦' },
    { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ];

  if (user?.isAdmin) {
    menuItems.push(
      { path: '/dashboard/admin', label: 'Admin Panel', icon: '👑' },
      { path: '/dashboard/content', label: 'Content Manager', icon: '✏️' } // ADD THIS LINE
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile Toggle */}
      <button 
        className="dashboard-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <span className="toggle-icon"></span>
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
        
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-avatar">
              {user?.firstName?.[0] || user?.email[0].toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <h3 className="sidebar-username">
                {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
              </h3>
              <p className="sidebar-email">{user?.email}</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="sidebar-footer">
            <Button 
              variant="primary" 
              className="sidebar-order-btn"
              onClick={() => {
                window.location.href = '/products';
                setIsSidebarOpen(false);
              }}
            >
              Order Mushrooms
            </Button>
            
            <button 
              className="sidebar-logout"
              onClick={handleLogout}
            >
              <span className="logout-icon">↪</span>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;