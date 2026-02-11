import React, { useState, useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import { useCart } from '../../context/context/CartContext';
import Button from '../../components/Button/Button';
import './Checkout.css';

const Checkout = ({ onBack, onComplete }) => {
  const { data } = useContext(SiteContext);
  const { cart, cartTotal, checkout } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipCode'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = 'This field is required';
      }
    });
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Simulate order processing
    const order = checkout(formData);
    setOrderId(order.id);
    setOrderComplete(true);
  };

  const formatPrice = (priceString) => {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, '')).toFixed(2);
  };

  if (orderComplete) {
    return (
      <section className="order-complete section-spacing">
        <div className="container">
          <div className="order-complete__content">
            <div className="order-complete__icon">✓</div>
            <h1 className="order-complete__title">Order Confirmed!</h1>
            <p className="order-complete__order-id">Order ID: #{orderId}</p>
            <p className="order-complete__message">
              Thank you for your order! We're preparing your mushrooms and will deliver 
              them to you on your selected delivery date.
            </p>
            <div className="order-complete__details">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cart.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${formatPrice(item.price) * item.quantity}</span>
                  </div>
                ))}
                <div className="order-total">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="order-complete__actions">
              <Button 
                variant="primary" 
                onClick={onComplete}
                className="order-complete__button"
              >
                Continue Shopping
              </Button>
              <Button 
                variant="secondary"
                onClick={() => window.print()}
              >
                Print Receipt
              </Button>
            </div>
            <p className="order-complete__note">
              A confirmation email has been sent to {formData.email}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout section-spacing">
      <div className="container">
        <div className="checkout__header">
          <button className="checkout__back" onClick={onBack}>
            ← Back to Cart
          </button>
          <h1 className="checkout__title">Checkout</h1>
          <p className="checkout__subtitle">Complete your order with fresh mushrooms</p>
        </div>

        <div className="checkout__content">
          <form className="checkout__form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="form-section__title">Contact Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                    placeholder="John"
                  />
                  {formErrors.firstName && (
                    <span className="form-error">{formErrors.firstName}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                    placeholder="Doe"
                  />
                  {formErrors.lastName && (
                    <span className="form-error">{formErrors.lastName}</span>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <span className="form-error">{formErrors.email}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.phone ? 'error' : ''}`}
                    placeholder="(555) 123-4567"
                  />
                  {formErrors.phone && (
                    <span className="form-error">{formErrors.phone}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2 className="form-section__title">Delivery Address</h2>
              
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.address ? 'error' : ''}`}
                  placeholder="123 Main St"
                />
                {formErrors.address && (
                  <span className="form-error">{formErrors.address}</span>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.city ? 'error' : ''}`}
                    placeholder="San Francisco"
                  />
                  {formErrors.city && (
                    <span className="form-error">{formErrors.city}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode" className="form-label">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`form-input ${formErrors.zipCode ? 'error' : ''}`}
                    placeholder="94107"
                  />
                  {formErrors.zipCode && (
                    <span className="form-error">{formErrors.zipCode}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2 className="form-section__title">Delivery Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="deliveryDate" className="form-label">
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryTime" className="form-label">
                    Preferred Time
                  </label>
                  <select
                    id="deliveryTime"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select a time</option>
                    <option value="9-12">Morning (9 AM - 12 PM)</option>
                    <option value="12-3">Afternoon (12 PM - 3 PM)</option>
                    <option value="3-6">Evening (3 PM - 6 PM)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="specialInstructions" className="form-label">
                  Special Instructions
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="3"
                  placeholder="Any special delivery instructions or notes..."
                />
              </div>
            </div>
            
            <div className="form-section">
              <h2 className="form-section__title">Order Review</h2>
              
              <div className="order-review">
                {cart.map(item => (
                  <div key={item.id} className="review-item">
                    <div className="review-item__info">
                      <span className="review-item__name">{item.name}</span>
                      <span className="review-item__quantity">× {item.quantity}</span>
                    </div>
                    <span className="review-item__price">
                      ${formatPrice(item.price) * item.quantity}
                    </span>
                  </div>
                ))}
                
                <div className="review-total">
                  <div className="review-total__row">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="review-total__row">
                    <span>Shipping</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="review-total__row">
                    <span>Tax (8%)</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="review-total__row total">
                    <span>Total</span>
                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <Button 
                type="submit" 
                variant="primary" 
                className="submit-button"
              >
                Place Order
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onBack}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;