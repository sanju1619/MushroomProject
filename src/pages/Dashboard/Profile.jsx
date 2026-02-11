import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import DashboardLayout from './DashboardLayout';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: 'Mushroom enthusiast and sustainable food advocate.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout active="profile">
      <div className="profile">
        <header className="profile__header">
          <h1 className="profile__title">My Profile</h1>
          <p className="profile__subtitle">Manage your personal information</p>
        </header>
        
        <div className="profile__content">
          {/* Profile Summary */}
          <div className="profile-summary">
            <div className="profile-avatar">
              <div className="avatar-large">
                {user?.firstName?.[0] || user?.email[0].toUpperCase()}
              </div>
              <div className="avatar-info">
                <h2 className="avatar-name">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                </h2>
                <p className="avatar-email">{user?.email}</p>
                <p className="avatar-member">Member since {user?.joinDate || '2024'}</p>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-value">12</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="profile-stat">
                <span className="stat-value">$284.50</span>
                <span className="stat-label">Total Spent</span>
              </div>
              <div className="profile-stat">
                <span className="stat-value">4</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>
          </div>
          
          {/* Profile Form */}
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="form-section__title">Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="John"
                    />
                  ) : (
                    <p className="form-display">{user?.firstName || 'Not set'}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Doe"
                    />
                  ) : (
                    <p className="form-display">{user?.lastName || 'Not set'}</p>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  ) : (
                    <p className="form-display">{user?.email}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                  ) : (
                    <p className="form-display">{user?.phone || 'Not set'}</p>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                    placeholder="Enter your full address"
                  />
                ) : (
                  <p className="form-display">{user?.address || 'Not set'}</p>
                )}
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="form-section__title">About Me</h3>
              
              <div className="form-group">
                <label className="form-label">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="form-display">{formData.bio}</p>
                )}
              </div>
            </div>
            
            <div className="form-actions">
              {isEditing ? (
                <>
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: user?.firstName || '',
                        lastName: user?.lastName || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        address: user?.address || '',
                        bio: 'Mushroom enthusiast and sustainable food advocate.'
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  type="button" 
                  variant="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
          
          {/* Account Settings */}
          <div className="account-settings">
            <h3 className="settings-title">Account Settings</h3>
            
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h4 className="setting-title">Password</h4>
                  <p className="setting-description">Last changed 30 days ago</p>
                </div>
                <Button variant="secondary" size="small">
                  Change Password
                </Button>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4 className="setting-title">Email Notifications</h4>
                  <p className="setting-description">Receive order updates and promotions</p>
                </div>
                <div className="toggle-switch">
                  <input type="checkbox" id="notifications" defaultChecked />
                  <label htmlFor="notifications" className="toggle-label"></label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4 className="setting-title">Two-Factor Authentication</h4>
                  <p className="setting-description">Add an extra layer of security</p>
                </div>
                <Button variant="secondary" size="small">
                  Enable 2FA
                </Button>
              </div>
              
              <div className="setting-item danger">
                <div className="setting-info">
                  <h4 className="setting-title">Delete Account</h4>
                  <p className="setting-description">Permanently delete your account and all data</p>
                </div>
                <Button variant="danger" size="small">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;