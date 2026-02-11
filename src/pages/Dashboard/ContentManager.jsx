import React, { useState, useContext, useEffect } from 'react';
import { SiteContext } from '../../context/SiteContext';
import DashboardLayout from './DashboardLayout';
import Button from '../../components/Button/Button';
import './ContentManager.css';

const ContentManager = () => {
  const { data, setData } = useContext(SiteContext);
  const [activeSection, setActiveSection] = useState('site');
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [newItem, setNewItem] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize with current data
  const [formData, setFormData] = useState({
    site: data?.site || { name: '', tagline: '' },
    navigation: data?.navigation || [],
    hero: data?.hero || {},
    features: data?.features || [],
    process: data?.process || [],
    products: data?.products || [],
    about: data?.about || {},
    team: data?.team || [],
    contact: data?.contact || {},
    productDetails: data?.productDetails || {}
  });

  // Update form data when context data changes
  useEffect(() => {
    if (data) {
      setFormData({
        site: data.site || { name: '', tagline: '' },
        navigation: data.navigation || [],
        hero: data.hero || {},
        features: data.features || [],
        process: data.process || [],
        products: data.products || [],
        about: data.about || {},
        team: data.team || [],
        contact: data.contact || {},
        productDetails: data.productDetails || {}
      });
    }
  }, [data]);

  const handleEditStart = (section, field, value, index = null) => {
    setEditingField({ section, field, index });
    setTempValue(value || '');
  };

  const handleEditSave = () => {
    if (!editingField) return;

    const { section, field, index } = editingField;
    const updatedFormData = { ...formData };

    if (index !== null) {
      // Editing array item
      if (field.includes('.')) {
        // Nested field (e.g., 'nutrition.calories')
        const [parentField, childField] = field.split('.');
        updatedFormData[section][index] = {
          ...updatedFormData[section][index],
          [parentField]: {
            ...updatedFormData[section][index][parentField],
            [childField]: tempValue
          }
        };
      } else {
        // Regular field in array
        updatedFormData[section][index] = {
          ...updatedFormData[section][index],
          [field]: tempValue
        };
      }
    } else {
      // Editing object field
      if (field.includes('.')) {
        // Nested field
        const [parentField, childField] = field.split('.');
        updatedFormData[section] = {
          ...updatedFormData[section],
          [parentField]: {
            ...updatedFormData[section][parentField],
            [childField]: tempValue
          }
        };
      } else {
        // Regular field
        updatedFormData[section] = {
          ...updatedFormData[section],
          [field]: tempValue
        };
      }
    }

    setFormData(updatedFormData);
    setEditingField(null);
    setTempValue('');
  };

  const handleEditCancel = () => {
    setEditingField(null);
    setTempValue('');
    setImagePreview(null);
  };

  const handleAddItem = (section) => {
    const defaultItem = {
      site: { id: Date.now(), name: '', path: '' },
      hero: { title: '', subtitle: '', image: '' },
      features: { id: Date.now(), title: '', description: '' },
      process: { id: Date.now(), step: '', title: '', description: '', image: '' },
      products: { 
        id: Date.now(), 
        name: '', 
        description: '', 
        price: '', 
        image: '', 
        available: true 
      },
      team: { 
        id: Date.now(), 
        name: '', 
        role: '', 
        bio: '', 
        image: '' 
      },
      productDetails: {
        id: Date.now(),
        name: '',
        scientificName: '',
        description: '',
        longDescription: '',
        price: '',
        image: '',
        available: true,
        nutrition: { calories: '', protein: '', carbs: '', fiber: '' },
        cookingTips: [''],
        storage: '',
        harvestSeason: ''
      }
    };

    setNewItem({ section, data: defaultItem[section] });
  };

  const handleSaveNewItem = () => {
    if (!newItem.section || !newItem.data) return;

    const updatedFormData = { ...formData };
    updatedFormData[newItem.section] = [
      ...updatedFormData[newItem.section],
      newItem.data
    ];

    setFormData(updatedFormData);
    setNewItem({});
  };

  const handleDeleteItem = (section, index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedFormData = { ...formData };
      updatedFormData[section] = updatedFormData[section].filter((_, i) => i !== index);
      setFormData(updatedFormData);
    }
  };

  const handleImageUpload = (e, section, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setImagePreview(imageUrl);
      
      if (index !== null) {
        handleEditStart(section, field, imageUrl, index);
      } else {
        handleEditStart(section, field, imageUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAll = () => {
    // In a real app, this would send data to backend
    if (setData) {
      setData(formData);
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('mushroom_cms_data', JSON.stringify(formData));
    alert('All changes saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all changes to original data?')) {
      setFormData({
        site: data?.site || { name: '', tagline: '' },
        navigation: data?.navigation || [],
        hero: data?.hero || {},
        features: data?.features || [],
        process: data?.process || [],
        products: data?.products || [],
        about: data?.about || {},
        team: data?.team || [],
        contact: data?.contact || {},
        productDetails: data?.productDetails || {}
      });
    }
  };

  const renderField = (label, value, section, field, index = null, type = 'text') => {
    const isEditing = editingField?.section === section && 
                     editingField?.field === field && 
                     editingField?.index === index;

    return (
      <div className="field-row">
        <label className="field-label">{label}:</label>
        {isEditing ? (
          type === 'textarea' ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="field-input textarea"
              rows={4}
            />
          ) : type === 'image' ? (
            <div className="image-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, section, field, index)}
                className="image-upload"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              )}
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="field-input"
                placeholder="Or enter image URL"
              />
            </div>
          ) : (
            <input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="field-input"
            />
          )
        ) : (
          <div className="field-display">
            {type === 'image' && value ? (
              <img src={value} alt={label} className="field-image" />
            ) : (
              <span className="field-value">{value || 'Not set'}</span>
            )}
            <button
              className="edit-btn"
              onClick={() => handleEditStart(section, field, value, index)}
            >
              ✏️
            </button>
          </div>
        )}
        
        {isEditing && (
          <div className="edit-actions">
            <button className="save-btn" onClick={handleEditSave}>Save</button>
            <button className="cancel-btn" onClick={handleEditCancel}>Cancel</button>
          </div>
        )}
      </div>
    );
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'site':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Site Information</h3>
            {renderField('Site Name', formData.site.name, 'site', 'name')}
            {renderField('Site Tagline', formData.site.tagline, 'site', 'tagline')}
            
            <h3 className="section-subtitle">Navigation</h3>
            <div className="array-items">
              {formData.navigation.map((item, index) => (
                <div key={item.id} className="array-item">
                  <div className="item-header">
                    <h4>Menu Item {index + 1}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteItem('navigation', index)}
                    >
                      🗑️
                    </button>
                  </div>
                  {renderField('Name', item.name, 'navigation', 'name', index)}
                  {renderField('Path', item.path, 'navigation', 'path', index)}
                </div>
              ))}
              <button 
                className="add-item-btn"
                onClick={() => handleAddItem('navigation')}
              >
                + Add Menu Item
              </button>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Hero Section</h3>
            {renderField('Title', formData.hero.title, 'hero', 'title')}
            {renderField('Subtitle', formData.hero.subtitle, 'hero', 'subtitle')}
            {renderField('Primary CTA', formData.hero.ctaPrimary, 'hero', 'ctaPrimary')}
            {renderField('Secondary CTA', formData.hero.ctaSecondary, 'hero', 'ctaSecondary')}
            {renderField('Image URL', formData.hero.image, 'hero', 'image', null, 'image')}
          </div>
        );

      case 'features':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Features Section</h3>
            <div className="array-items">
              {formData.features.map((feature, index) => (
                <div key={feature.id} className="array-item">
                  <div className="item-header">
                    <h4>Feature {index + 1}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteItem('features', index)}
                    >
                      🗑️
                    </button>
                  </div>
                  {renderField('Title', feature.title, 'features', 'title', index)}
                  {renderField('Description', feature.description, 'features', 'description', index, 'textarea')}
                </div>
              ))}
              <button 
                className="add-item-btn"
                onClick={() => handleAddItem('features')}
              >
                + Add Feature
              </button>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Process Steps</h3>
            <div className="array-items">
              {formData.process.map((step, index) => (
                <div key={step.id} className="array-item">
                  <div className="item-header">
                    <h4>Step {step.step}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteItem('process', index)}
                    >
                      🗑️
                    </button>
                  </div>
                  {renderField('Step Number', step.step, 'process', 'step', index)}
                  {renderField('Title', step.title, 'process', 'title', index)}
                  {renderField('Description', step.description, 'process', 'description', index, 'textarea')}
                  {renderField('Image URL', step.image, 'process', 'image', index, 'image')}
                </div>
              ))}
              <button 
                className="add-item-btn"
                onClick={() => handleAddItem('process')}
              >
                + Add Process Step
              </button>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Products</h3>
            <div className="array-items">
              {formData.products.map((product, index) => (
                <div key={product.id} className="array-item">
                  <div className="item-header">
                    <h4>{product.name || `Product ${index + 1}`}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteItem('products', index)}
                    >
                      🗑️
                    </button>
                  </div>
                  {renderField('Name', product.name, 'products', 'name', index)}
                  {renderField('Description', product.description, 'products', 'description', index, 'textarea')}
                  {renderField('Price', product.price, 'products', 'price', index)}
                  {renderField('Image URL', product.image, 'products', 'image', index, 'image')}
                  {renderField('Available', product.available ? 'Yes' : 'No', 'products', 'available', index, 'checkbox')}
                </div>
              ))}
              <button 
                className="add-item-btn"
                onClick={() => handleAddItem('products')}
              >
                + Add Product
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">About Page</h3>
            {renderField('Title', formData.about.title, 'about', 'title')}
            {renderField('Content', formData.about.content, 'about', 'content', null, 'textarea')}
            {renderField('Image URL', formData.about.image, 'about', 'image', null, 'image')}
          </div>
        );

      case 'team':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Team Members</h3>
            <div className="array-items">
              {formData.team.map((member, index) => (
                <div key={member.id} className="array-item">
                  <div className="item-header">
                    <h4>{member.name || `Team Member ${index + 1}`}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteItem('team', index)}
                    >
                      🗑️
                    </button>
                  </div>
                  {renderField('Name', member.name, 'team', 'name', index)}
                  {renderField('Role', member.role, 'team', 'role', index)}
                  {renderField('Bio', member.bio, 'team', 'bio', index, 'textarea')}
                  {renderField('Image URL', member.image, 'team', 'image', index, 'image')}
                </div>
              ))}
              <button 
                className="add-item-btn"
                onClick={() => handleAddItem('team')}
              >
                + Add Team Member
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Contact Information</h3>
            {renderField('Email', formData.contact.email, 'contact', 'email')}
            {renderField('Phone', formData.contact.phone, 'contact', 'phone')}
            {renderField('Address', formData.contact.address, 'contact', 'address', null, 'textarea')}
            {renderField('Hours', formData.contact.hours, 'contact', 'hours', null, 'textarea')}
          </div>
        );

      case 'productDetails':
        return (
          <div className="section-content">
            <h3 className="section-subtitle">Product Details</h3>
            <div className="array-items">
              {Object.entries(formData.productDetails).map(([slug, product], index) => (
                <div key={product.id} className="array-item detailed">
                  <div className="item-header">
                    <h4>{product.name || `Product ${index + 1}`}</h4>
                    <button 
                      className="delete-btn"
                      onClick={() => {
                        const updated = { ...formData.productDetails };
                        delete updated[slug];
                        setFormData({ ...formData, productDetails: updated });
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                  {renderField('Name', product.name, 'productDetails', `${slug}.name`, null)}
                  {renderField('Scientific Name', product.scientificName, 'productDetails', `${slug}.scientificName`, null)}
                  {renderField('Description', product.description, 'productDetails', `${slug}.description`, null, 'textarea')}
                  {renderField('Long Description', product.longDescription, 'productDetails', `${slug}.longDescription`, null, 'textarea')}
                  {renderField('Price', product.price, 'productDetails', `${slug}.price`, null)}
                  {renderField('Image URL', product.image, 'productDetails', `${slug}.image`, null, 'image')}
                  
                  <h5>Nutrition Information</h5>
                  {renderField('Calories', product.nutrition?.calories, 'productDetails', `${slug}.nutrition.calories`, null)}
                  {renderField('Protein', product.nutrition?.protein, 'productDetails', `${slug}.nutrition.protein`, null)}
                  {renderField('Carbs', product.nutrition?.carbs, 'productDetails', `${slug}.nutrition.carbs`, null)}
                  {renderField('Fiber', product.nutrition?.fiber, 'productDetails', `${slug}.nutrition.fiber`, null)}
                  
                  <h5>Cooking Tips</h5>
                  <div className="cooking-tips">
                    {product.cookingTips?.map((tip, tipIndex) => (
                      <div key={tipIndex} className="tip-item">
                        {renderField(`Tip ${tipIndex + 1}`, tip, 'productDetails', `${slug}.cookingTips.${tipIndex}`, null)}
                      </div>
                    ))}
                  </div>
                  
                  {renderField('Storage', product.storage, 'productDetails', `${slug}.storage`, null)}
                  {renderField('Harvest Season', product.harvestSeason, 'productDetails', `${slug}.harvestSeason`, null)}
                  {renderField('Available', product.available ? 'Yes' : 'No', 'productDetails', `${slug}.available`, null, 'checkbox')}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout active="admin">
      <div className="content-manager">
        <header className="manager-header">
          <div className="header-content">
            <h1 className="manager-title">Content Manager</h1>
            <p className="manager-subtitle">Edit all website content in real-time</p>
          </div>
          
          <div className="header-actions">
            <Button 
              variant="secondary"
              onClick={handleReset}
            >
              Reset Changes
            </Button>
            <Button 
              variant="primary"
              onClick={handleSaveAll}
            >
              Save All Changes
            </Button>
          </div>
        </header>

        <div className="manager-layout">
          {/* Sidebar Navigation */}
          <div className="manager-sidebar">
            <nav className="section-nav">
              <button 
                className={`nav-btn ${activeSection === 'site' ? 'active' : ''}`}
                onClick={() => setActiveSection('site')}
              >
                🏠 Site Info
              </button>
              <button 
                className={`nav-btn ${activeSection === 'hero' ? 'active' : ''}`}
                onClick={() => setActiveSection('hero')}
              >
                🎯 Hero Section
              </button>
              <button 
                className={`nav-btn ${activeSection === 'features' ? 'active' : ''}`}
                onClick={() => setActiveSection('features')}
              >
                ✨ Features
              </button>
              <button 
                className={`nav-btn ${activeSection === 'process' ? 'active' : ''}`}
                onClick={() => setActiveSection('process')}
              >
                🔄 Process
              </button>
              <button 
                className={`nav-btn ${activeSection === 'products' ? 'active' : ''}`}
                onClick={() => setActiveSection('products')}
              >
                🍄 Products
              </button>
              <button 
                className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setActiveSection('about')}
              >
                📖 About Page
              </button>
              <button 
                className={`nav-btn ${activeSection === 'team' ? 'active' : ''}`}
                onClick={() => setActiveSection('team')}
              >
                👥 Team Members
              </button>
              <button 
                className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveSection('contact')}
              >
                📞 Contact Info
              </button>
              <button 
                className={`nav-btn ${activeSection === 'productDetails' ? 'active' : ''}`}
                onClick={() => setActiveSection('productDetails')}
              >
                📋 Product Details
              </button>
            </nav>
            
            <div className="preview-info">
              <h4>Live Preview</h4>
              <p>Changes update in real-time. Click "Save All Changes" to persist.</p>
              <div className="stats">
                <div className="stat">
                  <span className="stat-value">{Object.keys(formData).length}</span>
                  <span className="stat-label">Sections</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{formData.products.length}</span>
                  <span className="stat-label">Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="manager-content">
            <div className="section-header">
              <h2 className="section-title">
                {activeSection === 'site' && 'Site Information'}
                {activeSection === 'hero' && 'Hero Section'}
                {activeSection === 'features' && 'Features Section'}
                {activeSection === 'process' && 'Process Steps'}
                {activeSection === 'products' && 'Products'}
                {activeSection === 'about' && 'About Page'}
                {activeSection === 'team' && 'Team Members'}
                {activeSection === 'contact' && 'Contact Information'}
                {activeSection === 'productDetails' && 'Product Details'}
              </h2>
              
              {editingField && (
                <div className="editing-notice">
                  <span>✏️ Editing...</span>
                  <button onClick={handleEditCancel}>Cancel</button>
                </div>
              )}
            </div>

            {renderSection()}

            {/* Live Preview */}
            <div className="preview-section">
              <h3 className="preview-title">Live Preview</h3>
              <div className="preview-container">
                {activeSection === 'site' && (
                  <div className="preview-card">
                    <h4>Site Preview</h4>
                    <p><strong>Name:</strong> {formData.site.name}</p>
                    <p><strong>Tagline:</strong> {formData.site.tagline}</p>
                    <div className="nav-preview">
                      {formData.navigation.map((item, index) => (
                        <span key={index} className="nav-item">{item.name}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeSection === 'hero' && (
                  <div className="preview-card">
                    <h4>Hero Preview</h4>
                    <h3>{formData.hero.title}</h3>
                    <p>{formData.hero.subtitle}</p>
                    {formData.hero.image && (
                      <img 
                        src={formData.hero.image} 
                        alt="Hero preview" 
                        className="preview-image"
                      />
                    )}
                    <div className="preview-actions">
                      <button className="preview-btn">{formData.hero.ctaPrimary}</button>
                      <button className="preview-btn secondary">{formData.hero.ctaSecondary}</button>
                    </div>
                  </div>
                )}
                
                {activeSection === 'products' && (
                  <div className="preview-card">
                    <h4>Product Preview</h4>
                    <div className="products-preview">
                      {formData.products.slice(0, 2).map((product, index) => (
                        <div key={index} className="product-preview">
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="preview-thumb"
                            />
                          )}
                          <div className="preview-details">
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <span className="preview-price">{product.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentManager;