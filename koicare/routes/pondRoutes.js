const express = require('express');
const router = express.Router();
const Pond = require('../models/pond');
const { verifyTokens, verifyMemberAndShopAndAdminRole } = require('../middleware/authMiddleware');

// Get pond by ID
router.get('/:id', (req, res) => {
    const pondId = req.params.id;
    // Input validation
    if (isNaN(pondId) || pondId <= 0) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    Pond.getPondById(pondId, (error, pond) => {
        if (error) {
            console.error('Error fetching pond:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (pond) {
            res.json(pond);
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

// Create pond
router.post('/', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const { name, image, size, depth, volume, num_of_drains, pump_capacity, user_id } = req.body;

    // Input validation
    if (!name || !image || !size || !depth || !volume || !num_of_drains || !pump_capacity || !user_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Additional validation
    if (isNaN(size) || size <= 0) {
        return res.status(400).json({ message: 'Invalid size' });
    }
    if (isNaN(depth) || depth <= 0) {
        return res.status(400).json({ message: 'Invalid depth' });
    }
    if (isNaN(volume) || volume <= 0) {
        return res.status(400).json({ message: 'Invalid volume' });
    }
    if (isNaN(num_of_drains) || num_of_drains <= 0) {
        return res.status(400).json({ message: 'Invalid number of drains' });
    }
    if (isNaN(pump_capacity) || pump_capacity <= 0) {
        return res.status(400).json({ message: 'Invalid pump capacity' });
    }
    if (isNaN(user_id) || user_id <= 0) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    Pond.createPond(name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, (error, result) => {
        if (error) {
            console.error('Error creating pond:', error);
            return res.status(500).json({ error: error.toString() });
        } else {
            res.status(201).json({ message: 'Pond created' });
        }
    });
});

// Update pond by ID
router.put('/:id', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const pondId = req.params.id;
    const { name, image, size, depth, volume, num_of_drains, pump_capacity } = req.body;

    // Input validation
    if (isNaN(pondId) || pondId <= 0) {
        return res.status(400).json({ message: 'Invalid pond ID' });
    }
    if (!name && !image && !size && !depth && !volume && !num_of_drains && !pump_capacity) {
        return res.status(400).json({ message: 'No fields to update.' });
    }
    // Additional validation
    if (name && (typeof name !== 'string' || name.length === 0)) {
        return res.status(400).json({ message: 'Invalid name' });
    }
    if (image && (typeof image !== 'string' || image.length === 0)) {
        return res.status(400).json({ message: 'Invalid image URL' });
    }
    if (size && (isNaN(size) || size <= 0)) {
        return res.status(400).json({ message: 'Invalid size' });
    }
    if (depth && (isNaN(depth) || depth <= 0)) {
        return res.status(400).json({ message: 'Invalid depth' });
    }
    if (volume && (isNaN(volume) || volume <= 0)) {
        return res.status(400).json({ message: 'Invalid volume' });
    }
    if (num_of_drains && (isNaN(num_of_drains) || num_of_drains <= 0)) {
        return res.status(400).json({ message: 'Invalid number of drains' });
    }
    if (pump_capacity && (isNaN(pump_capacity) || pump_capacity <= 0)) {
        return res.status(400).json({ message: 'Invalid pump capacity' });
    }

    Pond.getPondById(pondId, (error, pond) => {
        if (error) {
            console.error('Error fetching pond:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (pond) {
            Pond.updatePondById(pondId, name, image, size, depth, volume, num_of_drains, pump_capacity, (error, result) => {
                if (error) {
                    console.error('Error updating pond:', error);
                    if (error.message === 'No fields to update.') {
                        return res.status(400).json({ message: error.message });
                    } else if (error.message.startsWith('Invalid input data')) {
                        return res.status(400).json({ message: error.message });
                    } else {
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                } else if (result === 1) {
                    Pond.getPondById(pondId, (error, updatedPond) => {
                        if (error) {
                            console.error('Error fetching updated pond:', error);
                            return res.status(500).json({ message: 'Internal server error' });
                        }
                        res.json({ message: 'Pond updated', pond: updatedPond });
                    });
                } else {
                    res.status(404).json({ message: 'Pond not found' });
                }
            });
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

// Delete pond by ID
router.delete('/:id', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const pondId = req.params.id;
    // Input validation
    if (isNaN(pondId) || pondId <= 0) {
        return res.status(400).json({ message: 'Invalid pond ID' });
    }

    Pond.deletePondById(pondId, (error, result) => {
        if (error) {
            console.error('Error deleting pond:', error);
            if (error.message.startsWith('Cannot delete pond.')) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Pond deleted' });
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

// Get all ponds
router.get('/', (req, res) => {
    Pond.getAllPonds((error, ponds) => {
        if (error) {
            console.error('Error fetching ponds:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(ponds);
        }
    });
});

// Calculate salt amount for a pond
router.get('/:id/details', verifyTokens, verifyMemberAndShopAndAdminRole, (req, res) => {
    const pondId = req.params.id;

    Pond.getPondDetails(pondId, (error, pondDetails) => {
        if (error) {
            console.error('Error fetching pond details:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (pondDetails) {
            res.json(pondDetails);
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

module.exports = router;








