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
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    setIsLoading(true);

    try {
      const res=await axios.post('user-registration/',formData);
        console.log(res.data)
      navigate('/dashboard');
    } catch (err) {
        alert(err)
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-page section-spacing">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">Join Our Community</h1>
            <p className="auth-subtitle">Create your account to start ordering</p>
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
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John"
                  required
                  disabled={isLoading}
                />
              </div>
              
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
              />
              <p className="form-hint">
                Must be at least 8 characters long
              </p>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className="checkbox-custom"></span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              className="auth-button"
              disabled={isLoading}
              onclick={handleSubmit}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>
          
          <div className="auth-footer">
            <Link to="/login" className="auth-link-button">
              Sign In Instead
            </Link>
            
            <Link to="/" className="auth-home-link">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;