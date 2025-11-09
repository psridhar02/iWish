// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });
    
    // Hash the password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save(); // Save the new user with the HASHED password

    // Ensure this payload shape is consistent with the middleware
    const payload = { user: { id: user.id } }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.json({ token, username: user.username, email: user.email });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' }); // User not found

    // Compare the plain text password with the hashed password from the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' }); // Password mismatch

    // Ensure this payload shape is consistent with the middleware
    const payload = { user: { id: user.id } }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
    
    res.json({ token, username: user.username, email: user.email });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
};