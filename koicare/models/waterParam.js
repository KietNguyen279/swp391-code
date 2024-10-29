const db = require('../config/db');

// Get all water parameters
const getAllWaterParameters = (callback) => {
    const query = `SELECT * FROM Water_parameters;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

// Get water parameter by ID
const getWaterParameterById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (!Number.isInteger(id)) {
        return callback(new Error('Invalid water parameter ID. Must be an integer.'), null);
    }
    if (id === '') {
        return callback(new Error('Invalid water parameter ID. Must not be empty.'), null);
    }
    if (id === null) {
        return callback(new Error('Invalid water parameter ID. Must not be null.'), null);
    }
    if (id === undefined) {
        return callback(new Error('Invalid water parameter ID. Must not be undefined.'), null);
    }
    if (id === false) {
        return callback(new Error('Invalid water parameter ID. Must not be false.'), null);
    }
    if (id === true) {
        return callback(new Error('Invalid water parameter ID. Must not be true.'), null);
    }

    const query = `SELECT * FROM Water_parameters WHERE id = ?;`;
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null,
                null);
        }
    });
};

// Create water parameter
const createWaterParameter = (measurement_time, pond_id, callback) => {
    // Input validation
    if (!measurement_time || !pond_id) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    // Additional validation 
    if (typeof measurement_time !== 'string') {
        return callback(new Error('Invalid measurement_time. It must be a string.'), null);
    }
    if (isNaN(pond_id) || pond_id <= 0) {
        return callback(new Error('Invalid pond_id.'), null);
    }
    if (!Number.isInteger(pond_id)) {
        return callback(new Error('Invalid pond_id. Must be an integer.'), null);
    }
    if (pond_id === '') {
        return callback(new Error('Invalid pond_id. Must not be empty.'), null);
    }
    if (pond_id === null) {
        return callback(new Error('Invalid pond_id. Must not be null.'), null);
    }
    if (pond_id === undefined) {
        return callback(new Error('Invalid pond_id. Must not be undefined.'), null);
    }
    if (pond_id === false) {
        return callback(new Error('Invalid pond_id. Must not be false.'), null);
    }
    if (pond_id === true) {
        return callback(new Error('Invalid pond_id. Must not be true.'), null);
    }
    if (measurement_time === '') {
        return callback(new Error('Invalid measurement_time. Must not be empty.'), null);
    }
    if (measurement_time === null) {
        return callback(new Error('Invalid measurement_time. Must not be null.'), null);
    }
    if (measurement_time === undefined) {
        return callback(new Error('Invalid measurement_time. Must not be undefined.'), null);
    }
    if (measurement_time === false) {
        return callback(new Error('Invalid measurement_time. Must not be false.'), null);
    }
    if (measurement_time === true) {
        return callback(new Error('Invalid measurement_time. Must not be true.'), null);
    }
    if (measurement_time.length > 255) {
        return callback(new Error('Invalid measurement_time. Must not exceed 255 characters.'), null);
    }
    if (measurement_time.length < 1) {
        return callback(new Error('Invalid measurement_time. Must be at least 1 character.'), null);
    }
    if (pond_id.length > 255) {
        return callback(new Error('Invalid pond_id. Must not exceed 255 characters.'), null);
    }
    if (pond_id.length < 1) {
        return callback(new Error('Invalid pond_id. Must be at least 1 character.'), null);
    }

    const query = `
    INSERT INTO Water_parameters (measurement_time, pond_id)  
    VALUES (?, ?);`;
    db.query(query, [measurement_time, pond_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update water parameter by ID
const updateWaterParameterById = (id, measurement_time, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (!measurement_time || typeof measurement_time !== 'string') {
        return callback(new Error('Invalid input data. Measurement time is required and must be a string.'), null);
    }
    if (measurement_time === '') {
        return callback(new Error('Invalid measurement_time. Must not be empty.'), null);
    }
    if (measurement_time === null) {
        return callback(new Error('Invalid measurement_time. Must not be null.'), null);
    }
    if (measurement_time === undefined) {
        return callback(new Error('Invalid measurement_time. Must not be undefined.'), null);
    }
    if (measurement_time === false) {
        return callback(new Error('Invalid measurement_time. Must not be false.'), null);
    }
    if (measurement_time === true) {
        return callback(new Error('Invalid measurement_time. Must not be true.'), null);
    }
    if (measurement_time.length > 255) {
        return callback(new Error('Invalid measurement_time. Must not exceed 255 characters.'), null);
    }
    if (measurement_time.length < 1) {
        return callback(new Error('Invalid measurement_time. Must be at least 1 character.'), null);
    }
    if (!Number.isInteger(id)) {
        return callback(new Error('Invalid water parameter ID. Must be an integer.'), null);
    }
    if (id === '') {
        return callback(new Error('Invalid water parameter ID. Must not be empty.'), null);
    }
    if (id === null) {
        return callback(new Error('Invalid water parameter ID. Must not be null.'), null);
    }
    if (id === undefined) {
        return callback(new Error('Invalid water parameter ID. Must not be undefined.'), null);
    }
    if (id === false) {
        return callback(new Error('Invalid water parameter ID. Must not be false.'), null);
    }
    if (id === true) {
        return callback(new Error('Invalid water parameter ID. Must not be true.'), null);
    }

    const query = `UPDATE Water_parameters SET measurement_time = ? WHERE id = ?;`;
    db.query(query, [measurement_time, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete water parameter by ID
const deleteWaterParameterById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (!Number.isInteger(id)) {
        return callback(new Error('Invalid water parameter ID. Must be an integer.'), null);
    }
    if (id === '') {
        return callback(new Error('Invalid water parameter ID. Must not be empty.'), null);
    }
    if (id === null) {
        return callback(new Error('Invalid water parameter ID. Must not be null.'), null);
    }
    if (id === undefined) {
        return callback(new Error('Invalid water parameter ID. Must not be undefined.'), null);
    }
    if (id === false) {
        return callback(new Error('Invalid water parameter ID. Must not be false.'), null);
    }
    if (id === true) {
        return callback(new Error('Invalid water parameter ID. Must not be true.'), null);
    }
    
    const query = `DELETE FROM Water_parameters WHERE id = ?;`;
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

module.exports = {
    getAllWaterParameters,
    getWaterParameterById,
    createWaterParameter,
    updateWaterParameterById,
    deleteWaterParameterById
};