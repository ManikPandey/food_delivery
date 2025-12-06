import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMotorcycle, FaUtensils, FaClock, FaArrowLeft, FaBox } from 'react-icons/fa';

function OrderTracking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [orderId, setOrderId] = useState(searchParams.get('id') || null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Fetch User's Order History on Mount
  useEffect(() => {
    if (user) {
      axios.get(`${apiUrl}/orders?user=${user.name}`)
        .then(res => {
          setMyOrders(res.data);
          setLoading(false);
        })
        .catch(err => setLoading(false));
    }
  }, []);

  // 2. If URL has ID, fetch that specific order details
  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    } else {
      setOrderDetails(null); // Go back to list view if no ID
    }
  }, [orderId]);

  const fetchOrderDetails = async (id) => {
    try {
      const res = await axios.get(`${apiUrl}/order/${id}`);
      setOrderDetails(res.data);
    } catch (err) {
      console.error("Order not found");
    }
  };

  // Helper for Status Steps
  const getStepIndex = (status) => {
    const steps = ["Placed", "Preparing", "Out for Delivery", "Delivered"];
    return steps.indexOf(status);
  };
  const steps = ["Placed", "Preparing", "Out for Delivery", "Delivered"];
  const currentStep = orderDetails ? getStepIndex(orderDetails.status) : 0;

  // --- VIEW 1: ORDER HISTORY LIST ---
  if (!orderId) {
    return (
      <div className="track-container" style={{maxWidth: '800px'}}>
        <h2><FaBox /> Your Orders</h2>
        
        {!user ? (
           <p>Please login to view your orders.</p>
        ) : loading ? (
           <p>Loading orders...</p>
        ) : myOrders.length === 0 ? (
           <div style={{textAlign:'center', padding:'40px', color:'#777'}}>
             <h3>No orders found</h3>
             <p>Looks like you haven't ordered anything yet.</p>
           </div>
        ) : (
          <div className="order-history-list">
            {myOrders.map(order => (
              <div key={order._id} className="history-card" onClick={() => { setOrderId(order._id); navigate(`/track?id=${order._id}`) }}>
                <div className="history-header">
                  <div>
                    <span className="history-id">#{order._id.slice(-6)}</span>
                    <span className="history-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className={`status-badge ${order.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="history-items">
                  {order.items.map(i => i.name).join(', ')}
                </div>
                
                <div className="history-footer">
                  <span>Total: <strong>${order.totalAmount}</strong></span>
                  <button className="track-btn">Track Order &gt;</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- VIEW 2: TRACKING DETAILS (EXISTING UI) ---
  return (
    <div className="track-container">
      <button onClick={() => { setOrderId(null); navigate('/track'); }} style={{background:'none', border:'none', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px', color:'#666'}}>
        <FaArrowLeft /> Back to My Orders
      </button>

      {orderDetails && (
        <>
          <FaCheckCircle size={50} color="#60b246" />
          <h2>Order #{orderDetails._id.slice(-6)}</h2>
          <p className="order-meta">Ordered by {orderDetails.customerName}</p>

          <div className="progress-track">
            <div className="progress-line"></div>
            {steps.map((step, index) => (
              <div key={index} className={`step ${index <= currentStep ? 'active' : ''}`}>
                <div className="step-dot"></div>
                <div className="step-label">{step}</div>
              </div>
            ))}
          </div>

          <div className="status-message">
            {orderDetails.status === 'Placed' && <><FaClock /> Order placed. Waiting for confirmation.</>}
            {orderDetails.status === 'Preparing' && <><FaUtensils /> Your food is being prepared.</>}
            {orderDetails.status === 'Out for Delivery' && <><FaMotorcycle /> Driver is on the way!</>}
            {orderDetails.status === 'Delivered' && <><FaCheckCircle /> Enjoy your meal!</>}
          </div>

          <div className="order-summary-box">
             <h3>Order Items</h3>
             {orderDetails.items.map((item, idx) => (
               <div key={idx} style={{display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #eee'}}>
                 <span>{item.name} x {item.quantity || 1}</span>
                 <span>${item.price}</span>
               </div>
             ))}
             <div style={{display:'flex', justifyContent:'space-between', marginTop:'15px', fontWeight:'bold'}}>
               <span>Total Paid</span>
               <span>${orderDetails.totalAmount}</span>
             </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderTracking;