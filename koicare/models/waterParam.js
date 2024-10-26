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
    if (!measurement_time || !pond_id) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
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
    if (!measurement_time) {
        return callback(new Error('Invalid input data. Measurement time is required.'), null);
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