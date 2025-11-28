# Tikosasa - Ticket Selling Platform

A full-stack web application for buying and selling event tickets with QR code integration.

## 🎫 Features

### For Customers
- **Browse Events** - View all available events
- **Ticket Selection** - Choose between Regular and VIP tickets
- **Shopping Cart** - Add tickets to cart and manage selections
- **Checkout Process** - Simulated payment system
- **Digital Tickets** - Generate tickets with QR codes after purchase
- **Order History** - View previous purchases

### For Administrators
- **Event Management** - Create, edit, and delete events
- **Ticket Inventory** - Manage available tickets
- **Admin Dashboard** - Overview of all events and sales

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **CSS3** - Styling and responsive design
- **React Router** - Navigation and routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (or specify if you used another)
- **Clerk** - Authentication

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (or your database)
- npm

### BACKEND SETUP
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and configuration

# Start development server
npm run dev

### FROONTEND
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and configuration

# Start development server
npm run dev

### structure
tikosasa/
├── backend/
│   ├── controllers/     # Event, ticket, order controllers
│   ├── models/          # Event, User, Order models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & validation
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Event, Cart, Checkout pages
│   │   ├── lib/     
│   │   └── App.jsx       # Entry point
│   └── public/          # Static assets
└── README.md