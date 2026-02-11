import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { CartProvider } from './context/context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ContentManager from './pages/Dashboard/ContentManager';
// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import HowWeGrow from './pages/HowWeGrow/HowWeGrow';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import Orders from './pages/Dashboard/Orders';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Contact from './pages/Contact/Contact';

// Global CSS
import './styles/global.css';

function App() {
  return (
    <Router>
      <SiteProvider>
        <AuthProvider>
          <CartProvider>
            <div className="App">
              <Navbar />
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/how-we-grow" element={<HowWeGrow />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/orders" element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/dashboard/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/dashboard/content" element={
                         <ProtectedRoute requireAdmin={true}>
                              <ContentManager />
                         </ProtectedRoute>
                       } />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </SiteProvider>
    </Router>
  );
}

export default App;