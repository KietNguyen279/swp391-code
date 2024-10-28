const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/helper');
const { verifyToken } = require('../utils/helper');
const User = require('../models/user');
const { verifyTokenMiddleware } = require('../middleware/authMiddleware');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, password_confirm, role } = req.body;

    //Input validation
    if (!name || !email || !password || !password_confirm || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== password_confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Must be a @gmail.com, and no special characters." });
    }

    //Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return res.status(400).json({ message: "Password must contain both letters and numbers" });
    }

    //Name validation
    if (name.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long" });
    } else if (name.length > 10) {
      return res.status(400).json({ message: "Name must be less than 10 characters long" });
    }
    const allowedRoles = ['GUEST', 'MEMBER', 'SHOP', 'ADMIN'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //Stronger validation for name and password
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "Name can only contain letters and spaces" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }

    //Check if email already exists 
    try {
      const existingUser = await new Promise((resolve, reject) => {
        User.getUserByEmail(email, (error, existingUser) => {
          if (error) {
            reject(error);
          } else {
            resolve(existingUser);
          }
        });
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
    } catch (error) {
      console.error('Error checking for existing user:', error);
      return res.status(500).json({
        message:
          'Failed to check for existing user'
      });
    }

    //Check the data types of the input fields
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof role !== 'string') {
      return res.status(400).json({ message: 'Invalid data types for input fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    User.createUser({ name, email, password: hashedPassword, role }, (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: error.toString() });
      } else {
        return res.status(201).json({ message: "User registered" });
      }
    });
  } catch (error) {
    console.error('Error in registration:', error);
    return res.status(500).json({ error: error.toString() });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //Input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    //Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "This Email Is Not Existed !" });
    }

    try {
      const user = await new Promise((resolve, reject) => {
        User.getUserByEmail(email, (error, user) => {
          if (error) {
            reject(error);
          } else {
            resolve(user);
          }
        });
      });

      if (!user) {
        return res.status(401).json({ message: "Incorrect User Name !" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user.id, user.role);
        return res.json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(401).json({ message: "Incorrect Password !" });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: error.toString() });
    }

  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ error: error.toString() });
  }
});

// View Profile 
router.get('/profile', verifyTokenMiddleware, (req, res) => {

  //Validate userId from token
  const userId = req.userId;
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  User.getUserById(userId, (error, user) => {
    if (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: error.toString() });
    }

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    //Validate user data 
    if (!user.name) {
      return res.status(500).json({ message: 'User profile is missing name' });
    }
    if (!user.email) {
      return res.status(500).json({ message: 'User profile is missing email' });
    }
    if (!user.role) {
      return res.status(500).json({ message: 'User profile is missing role' });
    }
    if (!user.created_at) {
      return res.status(500).json({ message: 'User profile is missing created_at' });
    }
    const { password, ...userData } = user;

    res.json({ user: userData });
  });
});

// Update Profile  
router.put('/profile/', verifyTokenMiddleware, (req, res) => {

  const token = req.headers.authorization;
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }

  const userId = decoded.id;
  const updatedUserData = req.body;

  // Name validation
  if (updatedUserData.name !== undefined) {
    if (typeof updatedUserData.name !== 'string') {
      return res.status(400).json({ message: 'Invalid data type for name. Name must be a string.' });
    }
    if (updatedUserData.name.length === 0) {
      return res.status(400).json({ message: 'Name cannot be empty' });
    }
    if (updatedUserData.name.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters long' });
    }
    if (updatedUserData.name.length > 10) {
      return res.status(400).json({ message: 'Name must be less than 10 characters long' });
    }
    const nameRegex = /^[a-zA-Z\s]+$/;  
    if (!nameRegex.test(updatedUserData.name)) {
      return res.status(400).json({ message: 'Name can only contain letters and spaces' });
    }
  }

  // Email validation
  if (updatedUserData.email !== undefined) {
    if (typeof updatedUserData.email !== 'string') {
      return res.status(400).json({ message: 'Invalid data type for email. Email must be a string.' });
    }
    if (!isValidEmail(updatedUserData.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (updatedUserData.email.length === 0) {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }
  }

  User.updateUserById(userId, updatedUserData, (error, affectedRows) => {
    if (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ error: error.toString() });
    }

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  });
});

// Helper function to validate email format 
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailRegex.test(email);
}

module.exports = router;