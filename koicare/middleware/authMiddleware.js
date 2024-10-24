const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  

      req.userId = decoded.id; 
      req.userRole = decoded.role_id; 
      next(); 
    } catch (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};

// Middleware to verify JWT token and check role
const verifyTokenAndRole = (allowedRoles) => { 
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  

      req.userId = decoded.id; 
      req.userRole = decoded.role_id; 

      if (allowedRoles.includes(req.userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden - You do not have permission to access this resource' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
  };
};

module.exports = {
  verifyToken: verifyTokenMiddleware,
  verifyTokenAndRole
};