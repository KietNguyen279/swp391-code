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

    // 1. Basic input validation
    if (!name || !email || !password || !password_confirm || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== password_confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Must be a @gmail.com, and no special characters." });
    }

    // 3. Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return res.status(400).json({ message: "Password must contain both letters and numbers" });
    }

    // 4. Check if email already exists 
    User.getUserByEmail(email, (error, existingUser) => {
      if (error) {
        console.error('Error checking for existing user:', error);
        return res.status(500).json({ message: 'Failed to check for existing user' });
      }
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    User.createUser({ name, email, password: hashedPassword, role }, (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        if (error.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' });
        } else {
          return res.status(500).json({ error: error.toString() });
        }
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

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
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
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userRole = user.role;
        const token = generateToken(user.id, userRole);
        return res.json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
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

  const userId = req.userId;

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

    const { password, ...userData } = user;

    res.json({ user: userData });
  });
});

// Update Profile  
router.put('/profile/', verifyTokenMiddleware, (req, res) => {

  const token = req.headers.authorization;
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Failed to authenticate token 003' });
  }

  const userId = decoded.id;
  const updatedUserData = req.body;

  if (updatedUserData.name && updatedUserData.name.length === 0) {
    return res.status(400).json({ message: 'Name cannot be empty' });
  }
  if (updatedUserData.email && !isValidEmail(updatedUserData.email)) {
    return res.status(400).json({ message: 'Invalid email format' });
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;