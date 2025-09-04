const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Order Service is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
