import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

// Mock user data - will be replaced with Django backend
const mockUser = {
  id: 1,
  email: 'user@example.com',
  firstName: 'Alex',
  lastName: 'Chen',
  phone: '(555) 123-4567',
  address: '123 Forest Lane, Green Valley, CA 90210',
  joinDate: '2024-01-15',
  isAdmin: false
};

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-02-15',
    total: 48.76,
    status: 'delivered',
    items: [
      { name: 'Pearl Oyster', quantity: 2, price: 12.95 },
      { name: 'Blue Oyster', quantity: 1, price: 14.50 }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-10',
    total: 32.45,
    status: 'processing',
    items: [
      { name: 'Golden Oyster', quantity: 1, price: 15.75 },
      { name: 'Mushroom Mix', quantity: 1, price: 16.70 }
    ]
  }
];

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Simulate checking for existing session
  useEffect(() => {
    const storedUser = localStorage.getItem('mushroom_user');
    const storedOrders = localStorage.getItem('mushroom_orders');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(mockOrders);
      localStorage.setItem('mushroom_orders', JSON.stringify(mockOrders));
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock API call - Replace with Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = { ...mockUser, email };
          setUser(userData);
          localStorage.setItem('mushroom_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = async (userData) => {
    // Mock API call - Replace with Django backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          const newUser = {
            ...mockUser,
            email: userData.email,
            firstName: userData.firstName || '',
            lastName: userData.lastName || ''
          };
          setUser(newUser);
          localStorage.setItem('mushroom_user', JSON.stringify(newUser));
          resolve(newUser);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mushroom_user');
  };

  const updateProfile = (profileData) => {
    // Mock API call - Replace with Django backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem('mushroom_user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 500);
    });
  };

  const updateOrderStatus = (orderId, status) => {
    // Mock function - Replace with Django backend
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('mushroom_orders', JSON.stringify(updatedOrders));
  };

  const contextValue = useMemo(() => ({
    user,
    loading,
    orders,
    login,
    signup,
    logout,
    updateProfile,
    updateOrderStatus
  }), [user, loading, orders]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};