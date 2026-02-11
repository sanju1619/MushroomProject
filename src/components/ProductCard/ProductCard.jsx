import React from 'react';
import { useCart } from '../../context/context/CartContext';
import Button from '../Button/Button';
import './ProductCard.css';

const ProductCard = React.memo(({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card__image"
          loading="lazy"
        />
        {!product.available && (
          <div className="product-card__badge">Sold Out</div>
        )}
      </div>
      <div className="product-card__content">
        <div className="product-card__header">
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__price">{product.price}</span>
        </div>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__actions">
          <Button 
            variant={product.available ? "primary" : "secondary"}
            onClick={handleAddToCart}
            disabled={!product.available}
            className="product-card__button"
          >
            {product.available ? "Add to Cart" : "Notify When Available"}
          </Button>
          <button 
            className="product-card__details-btn"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;