import React, { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SiteContext } from '../../context/SiteContext';
import { useCart } from '../../context/context/CartContext';
import Button from '../../components/Button/Button';
import './ProductDetail.css';

const ProductDetail = () => {
  const { slug } = useParams();
  const { data } = useContext(SiteContext);
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const product = useMemo(() => {
    if (!data?.productDetails || !slug) return null;
    return data.productDetails[slug];
  }, [data?.productDetails, slug]);

  const cartItem = useMemo(() => {
    if (!product) return null;
    return cart.find(item => item.id === product.id);
  }, [cart, product]);

  const relatedProducts = useMemo(() => {
    if (!data?.products || !product) return [];
    return data.products.filter(p => p.id !== product.id && p.available).slice(0, 2);
  }, [data?.products, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  if (!product) {
    return (
      <section className="product-detail section-spacing">
        <div className="container">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <Button onClick={handleBack}>Back to Products</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail section-spacing">
      <div className="container">
        <button className="product-detail__back" onClick={handleBack}>
          ← Back to Products
        </button>
        
        <div className="product-detail__grid">
          <div className="product-detail__image-section">
            <div className="product-detail__image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-detail__image"
              />
            </div>
          </div>
          
          <div className="product-detail__content">
            <div className="product-detail__header">
              <div className="product-detail__title-group">
                <h1 className="product-detail__title">{product.name}</h1>
                <p className="product-detail__scientific">{product.scientificName}</p>
              </div>
              <span className="product-detail__price">{product.price}</span>
            </div>
            
            <p className="product-detail__description">{product.description}</p>
            <p className="product-detail__long-description">{product.longDescription}</p>
            
            <div className="product-detail__availability">
              <span className={`availability-badge ${product.available ? 'available' : 'unavailable'}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="harvest-season">Harvest: {product.harvestSeason}</span>
              {cartItem && (
                <span className="in-cart-badge">In Cart: {cartItem.quantity}</span>
              )}
            </div>
            
            <div className="product-detail__actions">
              <Button 
                variant="primary" 
                onClick={handleAddToCart}
                disabled={!product.available}
                className="product-detail__order-btn"
              >
                {product.available ? 'Add to Cart' : 'Notify When Available'}
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate('/dashboard/orders')}
              >
                View My Orders
              </Button>
            </div>
            
            <div className="product-detail__info-grid">
              <div className="info-card">
                <h3>Nutrition (per 100g)</h3>
                <ul className="nutrition-list">
                  <li>Calories: {product.nutrition.calories}</li>
                  <li>Protein: {product.nutrition.protein}</li>
                  <li>Carbs: {product.nutrition.carbs}</li>
                  <li>Fiber: {product.nutrition.fiber}</li>
                </ul>
              </div>
              
              <div className="info-card">
                <h3>Storage</h3>
                <p>{product.storage}</p>
              </div>
              
              <div className="info-card">
                <h3>Cooking Tips</h3>
                <ul className="tips-list">
                  {product.cookingTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-products__title">You Might Also Like</h2>
            <div className="related-products__grid">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="related-product-card"
                  onClick={() => navigate(`/products/${relatedProduct.name.toLowerCase().replace(/ /g, '-')}`)}
                >
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="related-product__image"
                  />
                  <div className="related-product__content">
                    <h3>{relatedProduct.name}</h3>
                    <p>{relatedProduct.description}</p>
                    <span className="related-product__price">{relatedProduct.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;