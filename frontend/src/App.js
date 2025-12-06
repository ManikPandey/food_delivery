import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav className="navbar">
        {/* ... (Keep your existing Navbar code) ... */}
        <Link to="/" className="nav-brand">Food<span style={{color:'black'}}>Verse</span></Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/track">Orders</Link>
              <Link to="/cart">
                <FaShoppingCart /> <span className="cart-badge">{cart.length}</span>
              </Link>
              <div style={{display: 'inline-block', marginLeft: '15px', cursor: 'pointer'}} onClick={logout}>
                <span style={{fontWeight: 'bold', marginRight:'5px'}}>Hi, {user.name.split(' ')[0]}</span>
                <FaUserCircle size={20}/>
              </div>
            </>
          ) : (
             <Link to="/login" className="login-btn">Login</Link>
          )}
          <Link to="/admin" style={{fontSize: '0.8rem', opacity: 0.5}}>Admin</Link>
        </div>
      </nav>
      
      {/* Global Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={user ? <Cart cart={cart} /> : <Navigate to="/login" />} />
        <Route path="/track" element={<OrderTracking />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;