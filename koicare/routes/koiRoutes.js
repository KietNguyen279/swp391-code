const express = require('express');
const router = express.Router();
const Koi = require('../models/koi');
const { verifyTokens, verifyMemberAndShopAndAdminRole } = require('../middleware/authMiddleware');

// Get koi by id
router.get('/:id', (req, res) => {
    const koiId = req.params.id;
    // Input validation
    if (isNaN(koiId) || koiId <= 0) {
        return res.status(400).json({ message: 'InvalidID' });
    }

    Koi.getKoiById(koiId, (error, koi) => {
        if (error) {
            console.error('Error fetching koi:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (koi) {
            res.json(koi);
        } else {
            res.status(404).json({ message: 'Koi not found' });
        }
    });
});

// Create koi
router.post('/', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const { name, image, body_shape, age, size, weight, gender, breed, origin, pond_id } = req.body;
    // Input validation
    if (!name || !image || !body_shape || !age || !size || !weight || !gender || !breed || !origin || !pond_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Additional validation
    if (typeof name !== 'string' || name.length < 2) {
        return res.status(400).json({ message: 'Invalid name. Name must be a string with at least 2 characters.' });
    }
    if (typeof image !== 'string' || image.length === 0) {
        return res.status(400).json({ message: 'Invalid image. Image URL must be a non-empty string.' });
    }
    if (typeof body_shape !== 'string' || body_shape.length === 0) {
        return res.status(400).json({ message: 'Invalid body_shape. Body shape must be a non-empty string.' });
    }
    if (isNaN(age) || age < 0) {
        return res.status(400).json({ message: 'Invalid age. Age must be a non-negative number.' });
    }
    if (isNaN(size) || size < 0) {
        return res.status(400).json({ message: 'Invalid size. Size must be a non-negative number.' });
    }
    if (isNaN(weight) || weight < 0) {
        return res.status(400).json({ message: 'Invalid weight. Weight must be a non-negative number.' });
    }

    Koi.createKoi(name, image, body_shape, age, size, weight, gender, breed, origin, pond_id, (error, result) => {
        if (error) {
            console.error('Error creating koi:', error);
            return res.status(500).json({ error: error.toString() });
        } else {
            res.status(201).json({ message: 'Koi created' });
        }
    });
});

// Update koi by ID
router.put('/:id', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const koiId = req.params.id;
    const { image, body_shape, age, size, weight, pond_id } = req.body;
    // Input validation
    if (!koiId || !image || !body_shape || !age || !size || !weight || !pond_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Additional validation
    if (isNaN(koiId) || koiId <= 0) {
        return res.status(400).json({ message: 'Invalid koi ID' });
    }
    if (typeof image !== 'string' || image.length === 0) {
        return res.status(400).json({ message: 'Invalid image. Image URL must be a non-empty string.' });
    }
    if (typeof body_shape !== 'string' || body_shape.length === 0) {
        return res.status(400).json({ message: 'Invalid body_shape. Body shape must be a non-empty string.' });
    }
    if (isNaN(age) || age < 0) {
        return res.status(400).json({ message: 'Invalid age. Age must be a non-negative number.' });
    }
    if (isNaN(size) || size < 0) {
        return res.status(400).json({ message: 'Invalid size. Size must be a non-negative number.' });
    }
    if (isNaN(weight) || weight < 0) {
        return res.status(400).json({ message: 'Invalid weight. Weight must be a non-negative number.' });
    }
    if (isNaN(pond_id) || pond_id <= 0) {
        return res.status(400).json({ message: 'Invalid pond ID' });
    }
    if (typeof pond_id !== 'number') {
        return res.status(400).json({ message: 'Invalid pond ID. Pond ID must be a number.' });
    }
    if (typeof body_shape !== 'string') {
        return res.status(400).json({ message: 'Invalid body_shape. Body shape must be a string.' });
    }
    if (typeof image !== 'string') {
        return res.status(400).json({ message: 'Invalid image. Image URL must be a string.' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ message: 'Invalid age. Age must be a number.' });
    }
    if (typeof size !== 'number') {
        return res.status(400).json({ message: 'Invalid size. Size must be a number.' });
    }
    if (typeof weight !== 'number') {
        return res.status(400).json({ message: 'Invalid weight. Weight must be a number.' });
    }

    Koi.updateKoiById(koiId, image, body_shape, age, size, weight, pond_id, (error, result) => {
        if (error) {
            console.error('Error updating koi:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (result === 1) {
            res.json({ message: 'Koi updated' });
        } else {
            res.status(404).json({ message: 'Koi not found' });
        }
    });
});

// Delete koi by ID
router.delete('/:id', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const koiId = req.params.id;
    // Input validation
    if (isNaN(koiId) || koiId <= 0) {
        return res.status(400).json({ message: 'Invalid koi ID' });
    }
    if (typeof koiId !== 'number') {
        return res.status(400).json({ message: 'Invalid koi ID. Koi ID must be a number.' });
    }
    
    Koi.deleteKoiById(koiId, (error, result) => {
        if (error) {
            console.error('Error deleting koi:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (result !== null) {
            res.json({ message: 'Koi and related growth records deleted successfully' });
        } else {
            res.status(404).json({ message: 'Koi not found' });
        }
    });
});

// Get all koi
router.get('/', (req, res) => {
    Koi.getAllKoi((error, koi) => {
        if (error) {
            console.error('Error fetching koi:', error);
            return res.status(500).json({ error: error.toString() });
        } else {
            res.json(koi);
        }
    });
});

// Calculate Koi Food
router.get('/:id/food', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const koiId = req.params.id;
    Koi.getKoiWithFoodById(koiId, (error, koi) => {
        if (error) {
            console.error('Error fetching koi with food:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (koi) {
            res.json(koi);
        } else {
            res.status(404).json({ message: 'Koi not found' });
        }
    });
});

module.exports = router;