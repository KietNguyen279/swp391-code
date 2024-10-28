const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/auth')

// Generate JWT token
const generateToken = (userId, roleId) => {
  if (!jwtSecretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  return jwt.sign({ id: userId, role: roleId }, jwtSecretKey, { expiresIn: '1h' });
};

// Verify JWT token
const verifyToken = (bearerToken) => {
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return { error: 'Invalid token format' };
  }

  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecretKey);
    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired:', err);
      return { error: 'TokenExpiredError' };
    } else if (err.name === 'JsonWebTokenError') {
      console.error('Invalid token:', err);
      return { error: 'JsonWebTokenError' };
    } else {
      console.error('Error verifying token:', err);
    }
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};