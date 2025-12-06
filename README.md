# 🍔 FoodVerse - Full Stack Food Delivery Platform

**FoodVerse** is a scalable, enterprise-grade food delivery application built using the **MERN Stack** (MongoDB, Express, React, Node.js). It features a fully functional customer interface for ordering and tracking, and a powerful Admin Dashboard for business analytics and operations management.

Designed to be cloud-native, this architecture is ready for deployment on **AWS** using Elastic Beanstalk, S3, and CloudFront.

---

## 🚀 Features

### 👤 User/Student Panel
* **Authentication:** Simulated login system with user session management.
* **Restaurant Discovery:** Browse restaurants with search functionality and category filters (Italian, Chinese, etc.).
* **Smart Menu:** Accordion-style menus with item details and "Add to Cart" functionality.
* **Cart & Checkout:** Split-screen cart view with bill summary, tax calculation, and simulated payment gateway.
* **Real-time Order Tracking:** Visual progress bar (Placed → Preparing → Out for Delivery → Delivered) updated in real-time.
* **Order History:** View past orders with status badges and re-order capability.

### 🛡️ Admin Dashboard
* **Analytics:** Visual data using **Recharts** (Bar charts for revenue, Pie charts for order status).
* **Live Order Management:** Accept/Reject orders and update delivery status instantly.
* **Menu Management:** Add new partner restaurants and configure menus.
* **Auto-Refresh:** Dashboard polls data every 5 seconds to show incoming orders without page reloads.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js
* **State Management:** React Hooks (useState, useEffect)
* **Styling:** Custom CSS with modern UI/UX principles
* **HTTP Client:** Axios
* **Visualization:** Recharts (Data Analytics)
* **Notifications:** React-Toastify
* **Icons:** React-Icons

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **CORS:** Cross-Origin Resource Sharing enabled

### Cloud & DevOps (Architecture)
* **Frontend Hosting:** AWS S3 + CloudFront (CDN)
* **Backend Hosting:** AWS Elastic Beanstalk (EC2 Auto-scaling)
* **Database:** AWS DocumentDB or MongoDB Atlas
* **Network:** VPC with Public/Private Subnets

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### 1. Prerequisites
* Node.js (v14 or higher) installed.
* MongoDB installed locally OR a MongoDB Atlas connection string.

### 2. Clone the Repository
```bash
git clone [https://github.com/your-username/foodverse.git](https://github.com/your-username/foodverse.git)
cd foodverse
``` 

### 3. Backend Setup
```Bash
cd backend
npm install
```

Create a .env file in the backend/ folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/foodapp
```

#### Or use your MongoDB Atlas Cloud URL

Seed the Database (Crucial for Demo): Run these scripts to populate Restaurants and Fake Order History for the Admin charts.

```Bash
node seed.js        # Adds Restaurants & Menus
node seedOrders.js  # Adds 20+ Historical Orders for Analytics
```
Start the Server:

```Bash
node server.js
Server runs on: http://localhost:5000
```

### 4. Frontend Setup
Open a new terminal.

```Bash
cd frontend
npm install
```
Create a .env file in the frontend/ folder:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React App:

```Bash
npm start
```
Client runs on: http://localhost:3000

--- 
### 📖 Usage Guide (How to Demo)

**Login:**

* Open http://localhost:3000.

* Click Login. Enter any email (e.g., student@vit.edu) to start a session.

Pro Tip: To see the Order History feature immediately, ensure your login name matches one of the names in seedOrders.js (e.g., "Manik Pandey").


**Place an Order:**

* Browse restaurants, add items to the cart.

* Go to Cart -> Proceed to Pay.

* Wait for the "Processing Payment" simulation.

* You will be redirected to the Tracking Page.

**Admin Management:**

* Open http://localhost:3000/admin in a new tab.

* View the Analytics Charts.

* Go to Orders Tab. You will see the order you just placed at the top.

* Click the Fork Icon (Preparing) or Truck Icon (Dispatch).

**Verify Sync:**

* Go back to the User Tab. The Tracking bar will automatically update to reflect the Admin's action.

📂 Project Structure

```
foodverse/
├── backend/
│   ├── models/         # Mongoose Schemas (Order, Restaurant)
│   ├── routes/         # API Endpoints
│   ├── seed.js         # Database seeder (Restaurants)
│   ├── seedOrders.js   # Database seeder (History)
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/
    │   │   ├── Home.js          # Landing Page
    │   │   ├── Cart.js          # Checkout Logic
    │   │   ├── AdminPanel.js    # Dashboard & Charts
    │   │   └── OrderTracking.js # Visual Stepper & History
    │   └── App.js      # Routing & Global State

```

### ☁️ AWS Deployment Architecture
For production deployment, this project is designed to follow the AWS 

**3-Tier Architecture:**

* **Presentation Tier:** React Build files hosted on S3 Bucket with CloudFront for HTTPS and caching.

* **Application Tier:** Node.js Backend deployed on AWS Elastic Beanstalk (managing EC2 instances and Load Balancers) inside a Private Subnet.

* **Data Tier:** MongoDB hosted on AWS DocumentDB or an EC2 instance in a secure Data Subnet.

* **CI/CD:** AWS CodePipeline connected to GitHub for automated deployment.

**🛡️ License**
This project is licensed under the MIT License - see the LICENSE file for details.

--- 
Developed by Manik Pandey VIT Bhopal University - CSE (AI & ML)
