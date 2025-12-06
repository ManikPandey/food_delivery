const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');

// --- USER APIs ---

// Get all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// Place Order
router.post('/order', async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      status: 'Placed', // Initial status
      createdAt: new Date()
    });
    await newOrder.save();
    res.json(newOrder);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// Get User Orders (Simulated by name for now, or just get all for demo)
router.get('/orders', async (req, res) => {
  try {
    const { user } = req.query; // Check if 'user' param exists
    let query = {};
    if (user) {
      query = { customerName: user }; // Filter by customer name
    }
    
    const orders = await Order.find(query).sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (e) { 
    res.status(500).json({error: e.message}); 
  }
});

// Get Single Order
router.get('/order/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// --- ADMIN APIs ---

// Add Restaurant
router.post('/admin/restaurant', async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    await newRestaurant.save();
    res.json(newRestaurant);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// Update Order Status (The most important Admin Feature)
router.put('/admin/order/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (e) { res.status(500).json({error: e.message}); }
});

// Delete Restaurant (Cleanup)
router.delete('/admin/restaurant/:id', async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;