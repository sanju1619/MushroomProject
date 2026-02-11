import React from 'react';
import './Button.css';

const Button = React.memo(({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;