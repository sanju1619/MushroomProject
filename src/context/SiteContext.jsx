import React, { createContext, useState, useEffect, useMemo } from 'react';
import siteData from '../data/siteData.json';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load from localStorage first, then from JSON file
    const savedData = localStorage.getItem('mushroom_cms_data');
    
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved data:', error);
        setData(siteData);
      }
    } else {
      setData(siteData);
    }
    
    setLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data) {
      localStorage.setItem('mushroom_cms_data', JSON.stringify(data));
    }
  }, [data]);

  const updateData = (newData) => {
    setData(newData);
  };

  const resetData = () => {
    setData(siteData);
    localStorage.removeItem('mushroom_cms_data');
  };

  const contextValue = useMemo(() => ({
    data,
    loading,
    setData: updateData,
    resetData
  }), [data, loading]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <SiteContext.Provider value={contextValue}>
      {children}
    </SiteContext.Provider>
  );
};