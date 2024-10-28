const express = require('express');
const router = express.Router();
const KoiGrowth = require('../models/koiGrowth');
const { verifyShopRole } = require('../middleware/authMiddleware');

// Create koi growth record
router.post('/', verifyShopRole, (req, res) => {
  const { growth_date, age, size, weight, koi_id } = req.body;

  if (!growth_date || age <= 0 || size <= 0 || weight <= 0 || !koi_id) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }
  if (isNaN(age) || isNaN(size) || isNaN(weight) || isNaN(koi_id)) {
    return res.status(400).json({ message: 'Invalid data type for age, size, weight, or koi_id.' });
  }
  if (size > 100 ){
    return res.status(400).json({ message: 'Koi can not be that big' });
  }
  if (age > 35 ){
    return res.status(400).json({ message: 'Koi can not be that old' });
  }
  if (weight > 41 ){
    return res.status(400).json({ message: 'Koi can not be that heavy' }); 
  } 
  if (age % 1 !== 0 || size % 1 !== 0 || weight % 1 !== 0) {
    return res.status(400).json({ message: 'Invalid input data. Age, size, and weight must be whole numbers.' });
  }
  if (age < 0 || size < 0 || weight < 0) {
      return res.status(400).json({ message: 'Invalid input data. Age, size, and weight must be positive numbers.' });
  }
  if (age === 0 || size === 0 || weight === 0) {
    return res.status(400).json({ message: 'Invalid input data. Age, size, and weight must be greater than 0.' });
  }

  KoiGrowth.createKoiGrowthRecord(growth_date, age, size, weight, koi_id, (error, result) => {
    if (error) {
      console.error('Error creating koi growth record:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.status(201).json({ message: 'Created successfully' });
  });
});

// Get koi growth record by ID
router.get('/:id', (req, res) => {
  const koiGrowthId = req.params.id;
  if (isNaN(koiGrowthId) || koiGrowthId <= 0) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  KoiGrowth.getKoiGrowthById(koiGrowthId, (error, koiGrowthRecord) => {
    if (error) {
      console.error('Error fetching koi growth record:', error);
      return res.status(500).json({ error: error.toString() });;
    } else if (koiGrowthRecord) {
      res.json(koiGrowthRecord);
    } else {
      res.status(404).json({ message: 'Koi growth record not found' });
    }
  });
});

// Update koi growth record by ID
router.put('/:id', verifyShopRole, (req, res) => {
  const koiGrowthId = req.params.id;
  const updatedKoiGrowthData = req.body; 

  // Check if input data is provided
  if (!updatedKoiGrowthData) {
    return res.status(400).json({ message: 'No input data provided' });
  }
  // Input validation
  const { growth_date, age, size, weight } = updatedKoiGrowthData;
  if (!growth_date || age <= 0 || size <= 0 || weight <= 0) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }
  // Data type validation
  if (isNaN(koiGrowthId) || koiGrowthId <= 0) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  if (isNaN(age) || isNaN(size) || isNaN(weight)) {
    return res.status(400).json({ message: 'Invalid data type for age, size, or weight.' });
  }
  if (size > 100 ){
    return res.status(400).json({ message: 'Koi can not be that big' });
  }
  if (age > 35 ){
    return res.status(400).json({ message: 'Koi can not be that old' });
  }
  if (weight > 41 ){
    return res.status(400).json({ message: 'Koi can not be that heavy' }); 
  } 
  if (age % 1 !== 0 || size % 1 !== 0 || weight % 1 !== 0) {
    return res.status(400).json({ message: 'Invalid input data. Age, size, and weight must be whole numbers.' });
  }
  if (age < 0 || size < 0 || weight < 0) {
      return res.status(400).json({ message: 'Invalid input data. Age, size, and weight must be positive numbers.' });
  }
  if (age === 0 || size === 0 || weight === 0) {
    return res.status(400).json({ message: 'Invalid input data. Age, size, and weight must be greater than 0.' });
  }

  KoiGrowth.updateKoiGrowthById(koiGrowthId, updatedKoiGrowthData, (error, result) => {
    if (error) {
      console.error('Error updating koi growth record:', error);
      return res.status(500).json({ error: error.toString() });;
    } else if (result === 1) {
      res.json({ message: 'Koi growth record updated' });
    } else {
      res.status(404).json({ message: 'Koi growth record not found' });
    }
  });
});

// Get all koi growth records
router.get('/', (req, res) => {
  KoiGrowth.getAllKoiGrowthRecords((error, koiGrowthRecords) => {
    if (error) {
      console.error('Error fetching koi growth records:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(koiGrowthRecords); 
    }
  });
});

module.exports = router;