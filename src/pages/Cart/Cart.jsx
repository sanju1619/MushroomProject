import React, { useMemo } from 'react';
import { useCart } from '../../context/context/CartContext';
import Button from '../../components/Button/Button';
import './Cart.css';

const Cart = ({ onCheckout, onContinueShopping }) => {
  const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity)) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      onCheckout();
    }
  };

  if (cartCount === 0) {
    return (
      <section className="cart-empty section-spacing">
        <div className="container">
          <div className="cart-empty__content">
            <div className="cart-empty__icon">🛒</div>
            <h1 className="cart-empty__title">Your cart is empty</h1>
            <p className="cart-empty__message">
              Looks like you haven't added any mushrooms to your cart yet.
            </p>
            <Button 
              variant="primary" 
              onClick={onContinueShopping}
              className="cart-empty__button"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart section-spacing">
      <div className="container">
        <div className="cart__header">
          <h1 className="cart__title">Your Cart</h1>
          <p className="cart__count">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
        </div>

        <div className="cart__content">
          <div className="cart__items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__image-container">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cart-item__image"
                  />
                </div>
                
                <div className="cart-item__details">
                  <div className="cart-item__header">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <button 
                      className="cart-item__remove"
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                  
                  <p className="cart-item__description">{item.description}</p>
                  
                  <div className="cart-item__footer">
                    <div className="cart-item__quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="quantity-input"
                        aria-label="Quantity"
                      />
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="cart-item__price">
                      <span className="cart-item__total-price">
                        ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                      </span>
                      <span className="cart-item__unit-price">
                        {item.price} each
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="cart__actions">
              <button 
                className="cart__clear-btn"
                onClick={() => {
                  if (window.confirm('Clear all items from cart?')) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </button>
              <Button 
                variant="secondary" 
                onClick={onContinueShopping}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
          
          <div className="cart__summary">
            <div className="cart-summary">
              <h2 className="cart-summary__title">Order Summary</h2>
              
              <div className="cart-summary__details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free">FREE</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="cart-summary__features">
                <div className="feature">
                  <span className="feature__icon">✓</span>
                  <span className="feature__text">Free local delivery</span>
                </div>
                <div className="feature">
                  <span className="feature__icon">✓</span>
                  <span className="feature__text">Harvested same day</span>
                </div>
                <div className="feature">
                  <span className="feature__icon">✓</span>
                  <span className="feature__text">100% satisfaction</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                onClick={handleCheckout}
                className="cart-summary__checkout-btn"
              >
                Proceed to Checkout
              </Button>
              
              <p className="cart-summary__note">
                Orders placed before 2pm are delivered same day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;