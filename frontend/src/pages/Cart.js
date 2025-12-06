import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function Cart({ cart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate Totals
  const itemTotal = cart.reduce((acc, item) => acc + item.price, 0);
  const deliveryFee = itemTotal > 0 ? 5 : 0;
  const taxes = itemTotal * 0.05; // 5% tax
  const grandTotal = itemTotal + deliveryFee + taxes;

  const placeOrder = async () => {
    setIsProcessing(true); // Start loading

    // Simulate "Contacting Bank" delay
    setTimeout(async () => {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        const user = JSON.parse(localStorage.getItem('user')); // Get logged in user data

        const orderData = {
          customerName: user ? user.name : "Guest", 
          address: "Room 101, Hostel A",
          items: cart,
          totalAmount: grandTotal
        };
        
        try {
          const res = await axios.post(`${apiUrl}/order`, orderData);
          setIsProcessing(false);
          alert("Payment Successful! Order Placed.");
          navigate(`/track?id=${res.data._id}`); 
        } catch (error) {
          console.error(error);
          setIsProcessing(false);
        }
    }, 2000); // 2 second fake delay
  };

  if (cart.length === 0) {
    return (
      <div style={{textAlign:'center', marginTop: '50px'}}>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty" style={{width:'300px'}}/>
        <h2>Your Cart is Empty</h2>
        <Link to="/" style={{color: '#fc8019', textDecoration:'none'}}>Go to Home</Link>
      </div>
    );
  }
  if (isProcessing) {
    return (
      <div style={{height: '80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div className="spinner" style={{width:'50px', height:'50px', border:'5px solid #f3f3f3', borderTop:'5px solid #fc8019', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
        <h3>Processing Payment...</h3>
        <p>Please do not close this window.</p>
        <style>{`@keyframes spin {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}`}</style>
      </div>
    );
  }

  return (
    
    <div className="cart-wrapper">
      {/* Left Side: Items */}
      <div className="cart-items">
        <h2>Shopping Cart ({cart.length} Items)</h2>
        {cart.map((item, index) => (
          <div key={index} className="cart-row">
             <div style={{display:'flex', alignItems:'center'}}>
                <div style={{width:'15px', height:'15px', border:'1px solid green', display:'flex', justifyContent:'center', alignItems:'center', marginRight:'10px'}}>
                    <div style={{width:'8px', height:'8px', background:'green', borderRadius:'50%'}}></div>
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <small style={{color:'#777'}}>{item.description}</small>
                </div>
             </div>
             <div>${item.price}</div>
          </div>
        ))}
      </div>

      {/* Right Side: Bill */}
      <div className="cart-bill">
        <h3>Bill Details</h3>
        <div className="bill-row">
          <span>Item Total</span>
          <span>${itemTotal.toFixed(2)}</span>
        </div>
        <div className="bill-row">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="bill-row">
          <span>Taxes (5%)</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>TO PAY</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
        
        <button className="checkout-btn" onClick={placeOrder}>
          PROCEED TO PAY
        </button>
      </div>
    </div>
  );
}
export default Cart;