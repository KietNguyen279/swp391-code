const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId, roleId) => { 
  return jwt.sign({ id: userId, role_id: roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT token
const verifyToken = (bearerToken) => {
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    return decoded; 
  } catch (err) {
    return null; 
  }
};

module.exports = {
  generateToken,
  verifyToken
};