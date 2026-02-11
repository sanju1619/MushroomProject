import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import './Auth.css';
import axios from '../../service/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await axios.post('user-registration/', formData);
      console.log('Registration successful:', res.data);
      setSuccess('Account created successfully! Welcome to Mushroom Service.');
      
      // Redirect to login or dashboard after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle specific error messages from backend
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.message || 'Email already exists. Please use a different email.');
        } else if (err.response.status === 422) {
          setError('Invalid email format or password requirements not met.');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page section-spacing">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">Join Mushroom Service</h1>
            <p className="auth-subtitle">Create your account to explore our mushroom varieties</p>
            <div className="mushroom-icon">
              🍄
            </div>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error">
                <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
            
            {success && (
              <div className="auth-success">
                <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
              <p className="form-hint">
                We'll send order confirmations to this email
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength="6"
              />
              <p className="form-hint">
                Minimum 6 characters required
              </p>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              className="auth-button"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
            
            <p className="terms-note">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="terms-link">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="terms-link">
                Privacy Policy
              </Link>
            </p>
          </form>
          
          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>
          
          <div className="auth-footer">
            <Link 
              to="/login" 
              className="auth-link-button"
              style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50'}}
            >
              Sign In to Your Account
            </Link>
            
            <div className="auth-benefits">
              <h3>Benefits of joining:</h3>
              <ul>
                <li>Browse premium mushroom varieties</li>
                <li>Track your orders</li>
                <li>Get exclusive mushroom cultivation tips</li>
                <li>Access seasonal mushroom specials</li>
              </ul>
            </div>
            
            <Link to="/" className="auth-home-link">
              ← Back to Mushroom Marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;