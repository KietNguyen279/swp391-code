const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndRole } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', verifyTokenAndRole([1]), (req, res) => {
    res.render('register'); 
});

module.exports = router;