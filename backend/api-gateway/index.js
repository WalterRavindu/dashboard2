require('dotenv').config();

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const express = require('express'); 
const morgan = require('morgan');  


const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');



const app = express();
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());


const verifyToken = require('./middleware/verifyToken');

//app.use(express.json());  



app.use('/users', /*verifyToken,*/createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl.replace(/^\/users/, '/users')
    //logLevel: 'debug'
}));

app.use('/products',/*verifyToken,*/createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl.replace(/^\/products/, '/products')
}));

app.use('/orders',/*verifyToken,*/ createProxyMiddleware({
    target: 'http://localhost:5003',
    /*
    This means any request to /orders/... on the
     API Gateway will be forwarded to the Orders 
     service running on port 5003.
    Example:

    Client calls http://gateway:5000/orders/123

    Gateway forwards it to http://localhost:5003/orders/123
    */


    changeOrigin: true,
    /*This changes the Host header in the request to match the 
    target server. Without this, some services might reject the
     request because the origin host looks different. */

     pathRewrite: (path, req) => req.originalUrl.replace(/^\/orders/, '/orders')
}));

app.use('/payments',verifyToken, createProxyMiddleware({
    target: 'http://localhost:5004',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl.replace(/^\/payments/, '/payments')
}));

app.use('/auths', createProxyMiddleware({
    target: 'http://localhost:5005',
    changeOrigin: true,
    pathRewrite: (path, req) => req.originalUrl.replace(/^\/auths/, '/auths')
}));


app.get('/', express.json(), (req, res) => {
    res.send('API Gateway is running');
});



// Start server
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});