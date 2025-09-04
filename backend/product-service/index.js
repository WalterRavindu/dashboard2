const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

/*
// Root route
app.get('/', (req, res) => {
    res.send('Product Service is running');
});
*/

// Start server
app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});
