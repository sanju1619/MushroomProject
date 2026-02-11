import React, { useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import Hero from '../../components/Hero/Hero';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import './Home.css';

const Home = () => {
  const { data } = useContext(SiteContext);

  const handleNavigate = (page) => {
    // Navigation handled by App.jsx
  };

  if (!data) return null;

  return (
    <>
      <Hero onNavigate={handleNavigate} />
      
      <section className="features section-spacing">
        <div className="container">
          <div className="features__header">
            <h2 className="features__title">Why Choose Our Mushrooms?</h2>
            <p className="features__subtitle">Quality you can taste, care you can trust</p>
          </div>
          
          <div className="features__grid">
            {data.features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-card__number">0{feature.id}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <SectionDivider />
      
      <section className="process-preview section-spacing">
        <div className="container">
          <div className="process-preview__header">
            <h2 className="process-preview__title">Our Cultivation Process</h2>
            <p className="process-preview__subtitle">From spore to harvest, every step matters</p>
          </div>
          
          <div className="process-preview__grid">
            {data.process.slice(0, 2).map((step) => (
              <div key={step.id} className="process-step">
                <div className="process-step__image-container">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="process-step__image"
                  />
                </div>
                <div className="process-step__content">
                  <span className="process-step__number">{step.step}</span>
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;