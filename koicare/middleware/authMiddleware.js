const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/auth')

const role = {
  ADMIN: 'ADMIN',
  SHOP: 'SHOP',
  MEMBER: 'MEMBER',
}

// Middleware to verify JWT token
const verifyTokenMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ message: 'You do not have permission here' });
  }
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecretKey);
    
    console.log("Decoded Token:", decoded); // Log the decoded token for debugging
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Failed to authenticate token' });
  }
};

// Verify Member role
const verifyMemberRole = (req, res, next) => {
  const userRole = req.userRole;
  if (userRole !== 'MEMBER') {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next();
};

// Verify Shop role
const verifyShopRole = (req, res, next) => {
  const userRole = req.userRole;
  if (userRole !== 'SHOP') {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next();
};

// Verify Admin role
const verifyAdminRole = (req, res, next) => {
  const userRole = req.userRole
  if (userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next();
};

// Verify Admin and Shop roles
const verifyAdminAndShopRole = (req, res, next) => {
  const userRole = req.userRole;
  if (userRole !== 'ADMIN' && userRole !== 'SHOP') {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next()
};

// Verify Member and Shop roles
const verifyMemberAndShopRole = (req, res, next) => {
  const userRole = req.userRole;
  if (userRole !== 'MEMBER' && userRole !== 'SHOP') {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next();
};

// Verify Member, Shop, and Admin roles
const verifyMemberAndShopAndAdminRole = (req, res, next) => {
  const userRole = req.userRole;
  if (userRole !== 'MEMBER' && userRole !== 'SHOP' && userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next();
};

module.exports = {
  verifyTokens: verifyTokenMiddleware,
  verifyMemberRole,
  verifyShopRole,
  verifyAdminRole,
  verifyMemberAndShopRole,
  verifyAdminAndShopRole,
  verifyMemberAndShopAndAdminRole
};