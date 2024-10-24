const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId, roleId) => {
  const secret = process.env.JWT_SECRET; 
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  return jwt.sign({ id: userId, role_id: roleId }, secret, { expiresIn: '1h' });
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