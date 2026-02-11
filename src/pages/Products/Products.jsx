import React, { useContext, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiteContext } from '../../context/SiteContext';
import { useCart } from '../../context/context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const { data } = useContext(SiteContext);
  const { cart, addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const availableProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter(product => product.available);
  }, [data?.products]);

  const handleOrder = (product) => {
    addToCart(product);
    setSelectedProduct(product);
  };

  const handleViewDetails = (product) => {
    const slug = product.name.toLowerCase().replace(/ /g, '-');
    navigate(`/products/${slug}`);
  };

  if (!data?.products) return null;

  return (
    <section className="products section-spacing">
      <div className="container">
        <div className="products__header">
          <h1 className="products__title">Our Mushrooms</h1>
          <p className="products__subtitle">
            Each variety offers unique flavors and textures, perfect for different culinary adventures
          </p>
        </div>
        
        <div className="products__grid">
          {availableProducts.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard 
                product={product} 
                onOrder={handleOrder}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>
        
        {selectedProduct && (
          <div className="products__selected">
            <p>Added to cart: {selectedProduct.name}</p>
            <button 
              className="products__close-selected"
              onClick={() => setSelectedProduct(null)}
            >
              Continue Shopping
            </button>
          </div>
        )}
        
        <div className="products__info">
          <div className="info-card">
            <h3>Delivery Information</h3>
            <p>Orders placed before 2pm are delivered same day. All mushrooms are packaged in breathable, compostable containers.</p>
          </div>
          <div className="info-card">
            <h3>Storage Tips</h3>
            <p>Keep mushrooms in their original container in the refrigerator. Use within 5 days for optimal freshness.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;