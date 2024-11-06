const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/auth');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
