import React, { useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import Button from '../Button/Button';
import './Hero.css';

const Hero = React.memo(({ onNavigate }) => {
  const { data } = useContext(SiteContext);

  if (!data?.hero) return null;

  return (
    <section className="hero section-spacing">
      <div className="hero__container container">
        <div className="hero__content">
          <h1 className="hero__title">
            {data.hero.title}
            <span className="hero__subtitle">
              {data.hero.subtitle}
            </span>
          </h1>
          <div className="hero__actions">
            <Button 
              variant="primary" 
              onClick={() => onNavigate('products')}
              className="hero__button"
            >
              {data.hero.ctaPrimary}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => onNavigate('how-we-grow')}
              className="hero__button"
            >
              {data.hero.ctaSecondary}
            </Button>
          </div>
        </div>
        <div className="hero__image-container">
          <div className="hero__image-wrapper">
            <img 
              src={data.hero.image} 
              alt="Fresh Oyster Mushrooms" 
              className="hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;