const db = require('../config/db');

// Create koi growth record
const createKoiGrowthRecord = (growth_date, age, size, weight, koi_id, callback) => {

  if (!growth_date || age <= 0 || size <= 0 || weight <= 0 || !koi_id) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (typeof growth_date !== 'string' || growth_date.length < 10) {
    return callback(new Error('Invalid growth date. Growth date must be a string in the format "YYYY-MM-DD".'), null);
  }
  if (isNaN(age) || isNaN(size) || isNaN(weight) || isNaN(koi_id)) {
    return callback(new Error('Invalid data type for age, size, weight, or koi_id.'), null);
  }
  if (age <= 0 || size <= 0 || weight <= 0 || koi_id <= 0) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === '' || size === '' || weight === '' || koi_id === '') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === null || size === null || weight === null || koi_id === null) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === undefined || size === undefined || weight === undefined || koi_id === undefined) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === 'null' || size === 'null' || weight === 'null' || koi_id === 'null') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === 'undefined' || size === 'undefined' || weight === 'undefined' || koi_id === 'undefined') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }

  const query = `
      INSERT INTO Koi_growth_record (growth_date, age, size, weight, koi_id)
      VALUES (?, ?, ?, ?, ?);
    `;
  db.query(query, [growth_date, age, size, weight, koi_id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Get koi growth record by ID
const getKoiGrowthById = (id, callback) => {
  // Input validation
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid koi growth record ID'), null);
  }
  if (id === '' || id === null || id === undefined) {
    return callback(new Error('Invalid koi growth record ID'), null);
  }
  if (id === 'null' || id === 'undefined') {
    return callback(new Error('Invalid koi growth record ID'), null);
  }
  if (typeof id !== 'number') {
    return callback(new Error('ID must be a number'), null);
  }
  if (id === 'NaN') {
    return callback(new Error('Invalid koi growth record ID'), null);
  }

  const query = `SELECT * FROM Koi_growth_record WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(null, null);
    }
  });
};

// Update koi growth record by ID
const updateKoiGrowthById = (id, updateKoiGrowthData, callback) => {

  const { growth_date, age, size, weight } = updateKoiGrowthData;
  if (!growth_date || age <= 0 || size <= 0 || weight <= 0) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  // Additional validation 
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid koi growth record ID'), null);
  }
  if (isNaN(age) || isNaN(size) || isNaN(weight)) {
    return callback(new Error('Invalid data type for age, size, or weight.'), null);
  }
  if (age <= 0 || size <= 0 || weight <= 0) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === '' || size === '' || weight === '') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === null || size === null || weight === null) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === undefined || size === undefined || weight === undefined) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === 'null' || size === 'null' || weight === 'null') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === 'undefined' || size === 'undefined' || weight === 'undefined') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (age === 'NaN' || size === 'NaN' || weight === 'NaN') {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  if (typeof growth_date !== 'string' || growth_date.length < 10) {
    return callback(new Error('Invalid growth date. Growth date must be a string in the format "YYYY-MM-DD".'), null);
  }
  if (growth_date === '' || growth_date === null || growth_date === undefined) {
    return callback(new Error('Invalid growth date'), null);
  }
  if (growth_date === 'null' || growth_date === 'undefined') {
    return callback(new Error('Invalid growth date'), null);
  }
  if (growth_date === 'NaN') {
    return callback(new Error('Invalid growth date'), null);
  }

  const query = `UPDATE Koi_growth_record SET ? WHERE id = ?`;
  db.query(query, [updateKoiGrowthData, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Get all koi growth records
const getAllKoiGrowthRecords = (callback) => {
  const query = `SELECT * FROM Koi_growth_record;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  getKoiGrowthById,
  updateKoiGrowthById,
  createKoiGrowthRecord,
  getAllKoiGrowthRecords
};