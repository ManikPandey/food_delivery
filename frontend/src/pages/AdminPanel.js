import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  FaChartBar, FaUtensils, FaShoppingBag, FaCheck, FaTruck, FaTrash, FaSync 
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  
  const [resName, setResName] = useState('');
  const [resCuisine, setResCuisine] = useState('');
  const [resImage, setResImage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchData(); // Fetch immediately on load

    // Set up a timer to fetch data every 5 seconds (Polling)
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup timer when we leave the page
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const ordersRes = await axios.get(`${apiUrl}/orders`);
      const resRes = await axios.get(`${apiUrl}/restaurants`);
      setOrders(ordersRes.data);
      setRestaurants(resRes.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/admin/order/${id}/status`, { status });
      fetchData();
      toast.success(`Order marked as ${status}`);
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const addRestaurant = async () => {
    if(!resName || !resCuisine) return toast.warning("Please fill all fields");
    try {
      await axios.post(`${apiUrl}/admin/restaurant`, {
        name: resName,
        cuisine: resCuisine,
        imageUrl: resImage || "https://via.placeholder.com/300",
        rating: 4.5,
        deliveryTime: "30-40 min",
        menu: []
      });
      toast.success('Restaurant Added Successfully!');
      fetchData();
      setResName(''); setResCuisine(''); setResImage('');
    } catch (error) {
      toast.error("Failed to add restaurant");
    }
  };

  // --- CHART DATA PREPARATION ---
  const prepareChartData = () => {
    // 1. Order Status Distribution (For Pie Chart)
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    
    const pieData = Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));

    // 2. Revenue Simulation (For Bar Chart)
    // Since we don't have real dates in the seed, we simulate "Last 5 Orders" as "Recent Trends"
    const recentRevenue = orders.slice(0, 5).map((order, index) => ({
      name: `Order #${index+1}`,
      amount: order.totalAmount
    }));

    return { pieData, recentRevenue };
  };

  const { pieData, recentRevenue } = prepareChartData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // --- DASHBOARD COMPONENT ---
  const Dashboard = () => {
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    
    return (
      <div className="admin-dashboard-container">
        {/* Top Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-value text-green">${totalRevenue.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <div className="stat-value">{orders.length}</div>
          </div>
          <div className="stat-card">
            <h3>Restaurants</h3>
            <div className="stat-value">{restaurants.length}</div>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="charts-grid">
          <div className="chart-box">
            <h3>Sales Trend (Recent)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={recentRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#fc8019" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Order Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h2 style={{color: '#fff', padding: '20px'}}>Admin<span style={{color:'#fc8019'}}>Panel</span></h2>
        <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <FaChartBar /> Dashboard
        </div>
        <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
          <FaShoppingBag /> Orders
        </div>
        <div className={`menu-item ${activeTab === 'restaurants' ? 'active' : ''}`} onClick={() => setActiveTab('restaurants')}>
          <FaUtensils /> Restaurants
        </div>
      </div>

      <div className="main-content">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
            <h1 style={{textTransform:'capitalize'}}>{activeTab} Overview</h1>
            <button onClick={fetchData} className="refresh-btn"><FaSync /> Refresh Data</button>
        </div>
        
        {activeTab === 'dashboard' && <Dashboard />}
        
        {activeTab === 'orders' && (
          <div className="order-list">
             <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>...{order._id.slice(-4)}</td>
                    <td>{order.customerName}</td>
                    <td>${order.totalAmount}</td>
                    <td><span className={`status-badge ${order.status.toLowerCase().replace(/\s/g, '-')}`}>{order.status}</span></td>
                    <td>
                      <button onClick={() => updateStatus(order._id, 'Preparing')} className="icon-btn accept"><FaUtensils/></button>
                      <button onClick={() => updateStatus(order._id, 'Out for Delivery')} className="icon-btn dispatch"><FaTruck/></button>
                      <button onClick={() => updateStatus(order._id, 'Delivered')} className="icon-btn complete"><FaCheck/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'restaurants' && (
            <div className="res-form-container">
                <div className="add-res-card">
                    <h3>Add New Partner</h3>
                    <input placeholder="Name" value={resName} onChange={e => setResName(e.target.value)} />
                    <input placeholder="Cuisine" value={resCuisine} onChange={e => setResCuisine(e.target.value)} />
                    <input placeholder="Image URL" value={resImage} onChange={e => setResImage(e.target.value)} />
                    <button onClick={addRestaurant} className="save-btn">Add Restaurant</button>
                </div>
                <div className="res-list-grid">
                    {restaurants.map(r => (
                        <div key={r._id} className="mini-res-card">
                            <img src={r.imageUrl} alt="" />
                            <div>
                                <strong>{r.name}</strong>
                                <p>{r.cuisine}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;