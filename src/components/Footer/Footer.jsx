import React, { useContext } from 'react';
import { SiteContext } from '../../context/SiteContext';
import './Footer.css';

const Footer = React.memo(({ onNavigate }) => {
  const { data } = useContext(SiteContext);

  if (!data) return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <h2 className="footer__logo">{data.site.name}</h2>
            <p className="footer__tagline">{data.site.tagline}</p>
          </div>
          
          <div className="footer__nav">
            <h4 className="footer__nav-title">Explore</h4>
            <ul className="footer__nav-list">
              {data.navigation.map((item) => (
                <li key={item.id}>
                  <button 
                    className="footer__nav-link"
                    onClick={() => onNavigate(item.name.toLowerCase().replace(' ', '-'))}
                  >
                    {item.name}
                  </button>
                </li>
                
              ))}

            </ul>
            <li>
                  <button 
    className="footer__nav-link"
    onClick={() => onNavigate('cart')}
  >
    Cart
                  </button>
            </li>
          </div>
          
          <div className="footer__contact">
            <h4 className="footer__nav-title">Contact Us</h4>
            <div className="footer__contact-info">
              <p>{data.contact.email}</p>
              <p>{data.contact.phone}</p>
              <p>{data.contact.address}</p>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} {data.site.name}. All rights reserved.
          </p>
          <p className="footer__note">
            Grown with care, delivered with pride.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;