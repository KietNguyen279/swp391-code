const express = require('express');
const router = express.Router();
const WaterValue = require('../models/waterValue');
const { verifyShopRole } = require('../middleware/authMiddleware');

// Get all water parameter values
router.get('/', (req, res) => {
    WaterValue.getAllWaterParams((error, waterParams) => {
        if (error) {
            console.error('Error fetching water parameters:', error);
            return res.status(500).json({ error: error.toString() });
        } else {
            res.json(waterParams);
        }
    });
});

// Get water param value by id of water and name of value
router.get('/:id/:name', (req, res) => {
    const waterParamId = req.params.id;
    const waterParamName = req.params.name;
    // Input validation
    if (isNaN(waterParamId) || waterParamId <= 0) {
        return res.status(400).json({ message: 'Invalid water parameter ID' });
    }
    if (waterParamName.length === 0) {
        return res.status(400).json({ message: 'Water parameter name must not be empty' });
    }
    if (waterParamName.length > 255) {
        return res.status(400).json({ message: 'Water parameter name is too long' });
    }
    if (new Date(measurement_time) > new Date()) {
        return res.status(400).json({ message: 'Invalid measurement_time. It must be a date in the past.' });
    }
    if (pond_id <= 0) {
        return res.status(400).json({ message: 'Invalid pond_id.' });
    }

    WaterValue.getWaterParamByIdAndName(waterParamId, waterParamName, (error, waterParam) => {
        if (error) {
            console.error('Error fetching water parameter:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (waterParam) {
            res.json(waterParam);
        } else {
            res.status(404).json({ message: 'Water parameter not found' });
        }
    });
});

// Create water param value
router.post('/', verifyShopRole, (req, res) => {
    const { name, param_value, water_parameters_id } = req.body;

    // Input validation
    if (!name || !param_value || !water_parameters_id) {
        return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
    }
    // Additional validation for each field
    if (isNaN(param_value)) {
        return res.status(400).json({ message: 'Invalid param_value' });
    }
    if (isNaN(water_parameters_id) || water_parameters_id <= 0) {
        return res.status(400).json({ message: 'Invalid water_parameters_id' });
    }
    if (name.length === 0) {
        return res.status(400).json({ message: 'Name must not be empty' });
    }
    if (name.length > 255) {
        return res.status(400).json({ message: 'Name is too long' });
    }
    if (param_value <= 0) {
        return res.status(400).json({ message: 'Param value must be greater than 0' });
    }
    if (water_parameters_id <= 0) {
        return res.status(400).json({ message: 'Water parameters ID must be greater than 0' });
    }
    if (pond_id <= 0) {
        return res.status(400).json({ message: 'Invalid pond_id.' });
    }

    WaterValue.createWaterParam(name, param_value, water_parameters_id, (error, result) => {
        if (error) {
            console.error('Error creating water parameter:', error);
            return res.status(500).json({ error: error.toString() });
        } else {
            res.status(201).json({ message: 'Water parameter created' });
        }
    });
});

// Update water param value by id of water and name of value
router.put('/:id/:name', verifyShopRole, (req, res) => {
    const waterParamId = req.params.id;
    const waterParamName = req.params.name;
    const updateValue = req.body.param_value;

    // Input validation
    if (isNaN(waterParamId) || waterParamId <= 0) {
        return res.status(400).json({ message: 'Invalid water parameter ID' });
    }
    if (!updateValue) {
        return res.status(400).json({ message: 'Invalid input data. Param value is required.' });
    }
    if (isNaN(updateValue)) {
        return res.status(400).json({ message: 'Invalid param_value' });
    }
    if (updateValue <= 0) {
        return res.status(400).json({ message: 'Param value must be greater than 0' });
    }
    if (waterParamName.length === 0) {
        return res.status(400).json({ message: 'Water parameter name must not be empty' });
    }
    if (waterParamName.length > 255) {
        return res.status(400).json({ message: 'Water parameter name is too long' });
    }
    if (new Date(measurement_time) > new Date()) {
        return res.status(400).json({ message: 'Invalid measurement_time. It must be a date in the past.' });
    }
    if (pond_id <= 0) {
        return res.status(400).json({ message: 'Invalid pond_id.' });
    }

    WaterValue.updateWaterParamByIdAndName(waterParamId, waterParamName, updateValue, (error, result) => {
        if (error) {
            console.error('Error updating water parameter:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (result === 1) {
            res.json({ message: 'Water parameter updated' });
        } else {
            res.status(404).json({ message: 'Water parameter not found' });
        }
    });
});

// Delete water param by id of water and name of value
router.delete('/:id/:name', verifyShopRole, (req, res) => {
    const waterParamId = req.params.id;
    const waterParamName = req.params.name;

    // Input validation
    if (isNaN(waterParamId) || waterParamId <= 0) {
        return res.status(400).json({ message: 'Invalid water parameter ID' });
    }

    WaterValue.deleteWaterParam(waterParamId, waterParamName, (error, result) => {
        if (error) {
            console.error('Error deleting water parameter:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (result === 1) {
            res.json({ message: 'Water parameter deleted' });
        } else {
            res.status(404).json({ message: 'Water parameter not found' });
        }
    });
});

module.exports = router;