const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/payments', paymentRoutes);

app.get('/', (req, res) => res.send('Payment Service is running'));

app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
