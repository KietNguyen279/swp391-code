const express = require('express');
const router = express.Router();
const WaterParam = require('../models/waterParam');
const { verifyToken, verifyTokenAndRole } = require('../middleware/authMiddleware');

// Get all water parameters
router.get('/', (req, res) => {
  WaterParam.getAllWaterParameters((error, waterParams) => {
    if (error) {
      console.error('Error fetching water parameters:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(waterParams); 
    }
  });
});

// Get water parameter by ID
router.get('/:id', (req, res) => {
  const waterParamId = req.params.id;
  WaterParam.getWaterParameterById(waterParamId, (error, waterParam) => {
    if (error) {
      console.error('Error fetching water parameter:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else if (waterParam) {
      res.json(waterParam);
    } else {
      res.status(404).json({ message: 'Water parameter not found' });
    }
  });
});

// Create water parameter
router.post('/', verifyTokenAndRole([3, 4]), (req, res) => {
  const { measurement_time, pond_id } = req.body;

  if (!measurement_time || !pond_id) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }

  WaterParam.createWaterParameter(measurement_time, pond_id, (error, result) => {
    if (error) {
      console.error('Error creating water parameter:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Water parameter created' });
    }
  });
});

// Update water parameter by ID
router.put('/:id', verifyTokenAndRole([3, 4]), (req, res) => {
  const waterParamId = req.params.id;
  const { measurement_time } = req.body; 

  if (!measurement_time) {
    return res.status(400).json({ message: 'Invalid input data. Measurement time is required.' });
  }

  WaterParam.updateWaterParameterById(waterParamId, measurement_time, (error, result) => {
    if (error) {
      console.error('Error updating water parameter:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else if (result === 1) {
      res.json({ message: 'Water parameter updated' });
    } else {
      res.status(404).json({ message: 'Water parameter not found' });
    }
  });
});

// Delete water parameter by ID
router.delete('/:id', verifyTokenAndRole([4]), (req, res) => {
  const waterParamId = req.params.id;

  WaterParam.deleteWaterParameterById(waterParamId, (error, result) => {
    if (error) {
      console.error('Error deleting water parameter:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else if (result === 1) {
      res.json({ message: 'Water parameter deleted' });
    } else {
      res.status(404).json({ message: 'Water parameter not found' });
    }
  });
});

module.exports = router;