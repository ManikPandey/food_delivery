import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate Login
    localStorage.setItem('user', JSON.stringify({ name: "Student User", email: email }));
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
    window.location.reload(); // To update Navbar
  };

  return (
    <div style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fce4ec'}}>
      <div style={{background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '300px'}}>
        <h2 style={{textAlign: 'center', color: '#fc8019'}}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Enter Email" 
            required 
            onChange={(e) => setEmail(e.target.value)}
            style={{width: '90%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px'}}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            style={{width: '90%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px'}}
          />
          <button type="submit" style={{width: '100%', padding: '12px', background: '#fc8019', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>
            LOGIN
          </button>
        </form>
        <p style={{textAlign:'center', marginTop:'15px', fontSize:'0.9rem', color:'#777'}}>
          (Project Mode:) 
        </p>
      </div>
    </div>
  );
}
export default Login;