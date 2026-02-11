import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SiteContext } from '../../context/SiteContext';
import { useCart } from '../../context/context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = React.memo(() => {
  const { data } = useContext(SiteContext);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  if (!data) return null;

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        <div className="navbar__left">
          <button 
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>
          
          <div 
            className="navbar__logo"
            onClick={() => handleNavigation('/')}
          >
            <h1>{data.site.name}</h1>
          </div>
        </div>
        
        <ul className={`navbar__menu ${isMobileMenuOpen ? 'navbar__menu--open' : ''}`}>
          {data.navigation.map((item) => (
            <li key={item.id} className="navbar__item">
              <button
                className={`navbar__link ${location.pathname === item.path ? 'navbar__link--active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        
        <div className="navbar__actions">
          <button 
            className="navbar__cart"
            onClick={() => handleNavigation('/cart')}
            aria-label="Shopping cart"
          >
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>
          
          {user ? (
            <div className="navbar__user">
              <button 
                className="navbar__user-toggle"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  {user.firstName?.[0] || user.email[0].toUpperCase()}
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="user-menu">
                  <div className="user-menu__header">
                    <div className="user-avatar large">
                      {user.firstName?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div className="user-info">
                      <p className="user-name">
                        {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                      </p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="user-menu__items">
                    <button 
                      className="user-menu__item"
                      onClick={() => handleNavigation('/dashboard')}
                    >
                      <svg className="user-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Dashboard
                    </button>
                    
                    <button 
                      className="user-menu__item"
                      onClick={() => handleNavigation('/dashboard/orders')}
                    >
                      <svg className="user-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      My Orders
                    </button>
                    
                    {user.isAdmin && (
                      <button 
                        className="user-menu__item"
                        onClick={() => handleNavigation('/dashboard/admin')}
                      >
                        <svg className="user-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Admin Panel
                      </button>
                    )}
                    
                    <div className="user-menu__divider"></div>
                    
                    <button 
                      className="user-menu__item user-menu__item--logout"
                      onClick={handleLogout}
                    >
                      <svg className="user-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth">
              <Button 
                variant="secondary" 
                onClick={() => handleNavigation('/login')}
                className="navbar__login-btn"
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                onClick={() => handleNavigation('/signup')}
                className="navbar__signup-btn"
              >
                Sign Up
              </Button>
            </div>
          )}
          
          <Button 
            variant="primary" 
            onClick={() => handleNavigation('/products')}
            className="navbar__order-btn"
          >
            Order Now
          </Button>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;