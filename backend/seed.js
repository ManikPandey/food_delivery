// backend/seed.js
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodapp', { useNewUrlParser: true, useUnifiedTopology: true });

const sampleRestaurants = [
  {
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-40 mins",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    menu: [
      { name: "Farmhouse Pizza", price: 12, description: "Loaded with veggies and cheese", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
      { name: "Peppy Paneer", price: 14, description: "Spicy paneer chunks", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002" }
    ]
  },
  {
    name: "Spice Symphony",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "40-50 mins",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=500&q=80",
    menu: [
      { name: "Butter Chicken", price: 18, description: "Rich creamy tomato gravy", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db" },
      { name: "Garlic Naan", price: 3, description: "Oven baked flatbread", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be" }
    ]
  },
  {
    name: "Wok This Way",
    cuisine: "Chinese",
    rating: 4.3,
    deliveryTime: "35-45 mins",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21720e32c4d?w=500&q=80",
    menu: [
      { name: "Hakka Noodles", price: 10, description: "Stir fried noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246" },
      { name: "Dim Sums", price: 12, description: "Steamed chicken dumplings", image: "https://images.unsplash.com/photo-1563245372-f21720e32c4d" }
    ]
  },
  {
    name: "Sweet Tooth",
    cuisine: "Desserts",
    rating: 4.9,
    deliveryTime: "20-30 mins",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80",
    menu: [
      { name: "Choco Lava Cake", price: 6, description: "Molten chocolate center", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9" },
      { name: "Berry Smoothie", price: 5, description: "Fresh mixed berries", image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625" }
    ]
  }
];

const seedDB = async () => {
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(sampleRestaurants);
  console.log("Database Seeded with Rich Data!");
  mongoose.connection.close();
};

seedDB();