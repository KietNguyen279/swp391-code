const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndRole } = require('../middleware/authMiddleware');
const Dashboard = require('../models/dashboard'); 

router.get('/', verifyTokenAndRole([4]), (req, res) => {
  const userId = req.userId; 

  Dashboard.getDashboardData(userId, (error, data) => {
    if (error) {
      console.error('Error fetching dashboard data:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.json(data); 
  });
});

module.exports = router;