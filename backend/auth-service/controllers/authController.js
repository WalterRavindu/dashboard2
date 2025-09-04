// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Dummy user store (replace with DB later)
const users = [];


const register = async (req,res) =>{

    const {username,password} = req.body;

    if(!username || !password){
        return res.status(400).json({message:"Username and Password are required"});
    }

    //Check is a user exists
    const existinguser = users.find(user => user.username === username);
    if(existinguser){
        return res.status(400).json({message:"The Username exists"});
    }

    //Hash pasword
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id:users.length+1,
        username,
        password:hashedPassword
    };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: { username } });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials ( invalid username )' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials ( invalid password )' });
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ message: 'Login successful', token });
};

module.exports = { register, login };