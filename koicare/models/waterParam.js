const db = require('../config/db');

// Get all water parameter
const getAll = (callback) => {
    const query = `SELECT * FROM Water_parameters;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

// Get water param by id
const getById = (id, callback) => {
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

// Create water param
const create = (measurement_time, pond_id, callback) => {
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

// Update water param by id
const updateById = (id, measurement_time, updateValue, callback) => {
    if (!updateValue) {
        return callback(new Error('Invalid input data. Param value is required.'), null);
    }

    const query = `UPDATE Water_parameters SET measurement_time = ? WHERE id = ?;`;
    db.query(query, [updateValue, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete water param by id
const deleteById = (id, name, callback) => {
    const query = `DELETE FROM Water_parameters WHERE id = ?;`;
    db.query(query, [id, name], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};