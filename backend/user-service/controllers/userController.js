// controllers/userController.js
const pool = require('../db');

// Get all users
const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, password FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT id, name, email, password FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password, address } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Insert user into database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING id, name, email, password, address, created_at',
      [name, email, password, address || null]
    );

    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    console.error('Database error:', err);
    
    // Handle unique email violation
    if (err.code === '23505' && err.constraint === 'users_email_key') {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password, address } = req.body;

  try {
    // Update user, using COALESCE to keep old values if not provided
    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           password = COALESCE($3, password),
           address = COALESCE($4, address)
       WHERE id = $5
       RETURNING id, name, email, password, address, created_at`,
      [name, email, password, address, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', user: result.rows[0] });
  } catch (err) {
    console.error('Database error:', err);

    // Handle unique email violation
    if (err.code === '23505' && err.constraint === 'users_email_key') {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, name, email, password',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error', error: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
