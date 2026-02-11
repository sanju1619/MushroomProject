import React, { useContext, useState } from 'react';
import { SiteContext } from '../../context/SiteContext';
import Button from '../../components/Button/Button';
import './Contact.css';

const Contact = () => {
  const { data } = useContext(SiteContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  if (!data?.contact) return null;

  return (
    <section className="contact section-spacing">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <h1 className="contact__title">Get in Touch</h1>
            <p className="contact__description">
              Have questions about our mushrooms or growing process? We'd love to hear from you.
            </p>
            
            <div className="contact__details">
              <div className="contact__detail">
                <h3>Email</h3>
                <p>{data.contact.email}</p>
              </div>
              <div className="contact__detail">
                <h3>Phone</h3>
                <p>{data.contact.phone}</p>
              </div>
              <div className="contact__detail">
                <h3>Address</h3>
                <p>{data.contact.address}</p>
              </div>
              <div className="contact__detail">
                <h3>Hours</h3>
                <pre className="contact__hours">{data.contact.hours}</pre>
              </div>
            </div>
          </div>
          
          <div className="contact__form-container">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <Button type="submit" variant="primary" className="contact__submit">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;