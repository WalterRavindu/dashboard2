const pool = require('../db'); // PostgreSQL connection pool

// Get all products
const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching product' });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const result = await pool.query(
            `INSERT INTO products (name, description, price, stock) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, description || '', price, stock || 0]
        );

        res.status(201).json({ message: 'Product Created', product: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating product' });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description, price, stock } = req.body;

        const result = await pool.query(
            `UPDATE products 
             SET name = $1, description = $2, price = $3, stock = $4
             WHERE id = $5 RETURNING *`,
            [name, description || '', price, stock || 0, id]
        );

        if (result.rows.length > 0) {
            res.json({ message: 'Product Updated', product: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating product' });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length > 0) {
            res.json({ message: 'Product Deleted', deletedProduct: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting product' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
