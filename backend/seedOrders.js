const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected for Order Seeding"));

const customerNames = ["Manik Pandey", "Rahul Sharma", "Priya Verma", "Amit Singh", "Sneha Gupta", "Vikram Malhotra"];
const statuses = ["Delivered", "Delivered", "Delivered", "Out for Delivery", "Preparing", "Placed"];
const itemsList = [
    { name: "Farmhouse Pizza", price: 12, quantity: 1 },
    { name: "Burger King Whopper", price: 8, quantity: 2 },
    { name: "Choco Lava Cake", price: 6, quantity: 3 },
    { name: "Butter Chicken", price: 18, quantity: 1 }
];

const generateRandomOrders = () => {
    const orders = [];
    
    // Create 20 Fake Orders
    for (let i = 0; i < 20; i++) {
        const randomItem = itemsList[Math.floor(Math.random() * itemsList.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        orders.push({
            customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
            address: "VIT Bhopal Hostel Block 1",
            items: [randomItem],
            totalAmount: (randomItem.price * randomItem.quantity) + 5, // +5 delivery fee
            status: status,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)) // Random time in the past
        });
    }
    return orders;
};

const seedOrders = async () => {
    try {
        await Order.deleteMany({}); // Clear existing orders (Optional: remove this line if you want to keep adding)
        const fakeOrders = generateRandomOrders();
        await Order.insertMany(fakeOrders);
        console.log("✅ Database Populated with 20 Fake Orders!");
        process.exit();
    } catch (error) {
        console.error("Error seeding orders:", error);
        process.exit(1);
    }
};

seedOrders();