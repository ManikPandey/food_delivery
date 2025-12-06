const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  cuisine: String,
  rating: Number,          // New
  deliveryTime: String,    // New
  imageUrl: String,        // New
  menu: [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);