const jwt = require('jsonwebtoken');
const  jwtSecretKey = require('../config/auth')

// Generate JWT token
const generateToken = (userId, roleId) => {
  if (!jwtSecretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  return jwt.sign({ id: userId, role: roleId }, jwtSecretKey, { expiresIn: '1h' });
};

// Verify JWT token
const verifyToken = (bearerToken) => {
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecretKey); 
    return decoded; 
  } catch (err) {
    return null; 
  }
};

module.exports = {
  generateToken,
  verifyToken
};