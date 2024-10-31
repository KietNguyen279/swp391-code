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
const createWaterParameter = (date, pond_id, callback) => {
    // Input validation
    if (!date || !pond_id) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    // Additional validation 
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
    if (pond_id.length > 255) {
        return callback(new Error('Invalid pond_id. Must not exceed 255 characters.'), null);
    }
    if (pond_id.length < 1) {
        return callback(new Error('Invalid pond_id. Must be at least 1 character.'), null);
    }

    const query = `
    INSERT INTO Water_parameters (date, pond_id)  
    VALUES (?, ?);`;
    db.query(query, [date, pond_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update water parameter by ID
const updateWaterParameterById = (id, date, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (!date || typeof date !== 'string') {
        return callback(new Error('Invalid input data. Measurement time is required and must be a string.'), null);
    }
    if (date === '') {
        return callback(new Error('Invalid date. Must not be empty.'), null);
    }
    if (date === null) {
        return callback(new Error('Invalid date. Must not be null.'), null);
    }
    if (date === undefined) {
        return callback(new Error('Invalid date. Must not be undefined.'), null);
    }
    if (date === false) {
        return callback(new Error('Invalid date. Must not be false.'), null);
    }
    if (date === true) {
        return callback(new Error('Invalid date. Must not be true.'), null);
    }
    if (date.length > 255) {
        return callback(new Error('Invalid date. Must not exceed 255 characters.'), null);
    }
    if (date.length < 1) {
        return callback(new Error('Invalid date. Must be at least 1 character.'), null);
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

    const query = `UPDATE Water_parameters SET date = ? WHERE id = ?;`;
    db.query(query, [date, id], (error, results) => {
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