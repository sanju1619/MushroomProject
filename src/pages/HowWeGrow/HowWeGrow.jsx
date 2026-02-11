import React, { useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import './HowWeGrow.css';

const HowWeGrow = () => {
  const { data } = useContext(SiteContext);

  if (!data?.process) return null;

  return (
    <section className="how-we-grow section-spacing">
      <div className="container">
        <div className="how-we-grow__header">
          <h1 className="how-we-grow__title">How We Grow</h1>
          <p className="how-we-grow__subtitle">Our meticulous process ensures every mushroom reaches peak perfection</p>
        </div>
        
        <div className="process-timeline">
          {data.process.map((step, index) => (
            <div 
              key={step.id} 
              className={`process-step-timeline ${index % 2 === 0 ? 'process-step-timeline--left' : 'process-step-timeline--right'}`}
            >
              <div className="process-step-timeline__content">
                <div className="process-step-timeline__number">{step.step}</div>
                <h3 className="process-step-timeline__title">{step.title}</h3>
                <p className="process-step-timeline__description">{step.description}</p>
              </div>
              <div className="process-step-timeline__image-container">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="process-step-timeline__image"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="process-summary">
          <h2 className="process-summary__title">The Result</h2>
          <p className="process-summary__text">
            This careful, attentive process results in mushrooms that are not only beautiful but also 
            packed with flavor and nutrition. Each mushroom tells the story of its journey from spore 
            to harvest—a story of care, patience, and respect for nature.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeGrow;