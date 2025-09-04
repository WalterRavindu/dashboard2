require('dotenv').config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);


const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5005;


// Middleware - fix typo
app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/auths', authRoutes);


// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.url} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});