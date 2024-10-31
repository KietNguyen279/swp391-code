const db = require('../config/db');

// Get water param value by id of water and name of value
const getWaterParamByIdAndName = (id, name, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (typeof name !== 'string' || name.length === 0) {
        return callback(new Error('Invalid water parameter name'), null);
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
    if (name === '') {
        return callback(new Error('Invalid water parameter name. Must not be empty.'), null);
    }
    if (name === null) {
        return callback(new Error('Invalid water parameter name. Must not be null.'), null);
    }
    if (name === undefined) {
        return callback(new Error('Invalid water parameter name. Must not be undefined.'), null);
    }
    if (name === false) {
        return callback(new Error('Invalid water parameter name. Must not be false.'), null);
    }
    if (name === true) {
        return callback(new Error('Invalid water parameter name. Must not be true.'), null);
    }

    const query = `SELECT param_value FROM Water_parameter_value WHERE water_parameters_id = ? AND name = ?;`;
    db.query(query, [id, name], (error, results) => {
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

// Create water param value
const createWaterParam = (name, param_value, water_parameters_id, callback) => {
    // Input validation
    if (!name || !param_value || !water_parameters_id) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    // Additional validation 
    if (typeof name !== 'string' || name.length === 0) {
        return callback(new Error('Invalid name'), null);
    }
    if (isNaN(param_value)) {
        return callback(new Error('Invalid param_value'), null);
    }
    if (isNaN(water_parameters_id) || water_parameters_id <= 0) {
        return callback(new Error('Invalid water_parameters_id'), null);
    }
    if (!Number.isInteger(water_parameters_id)) {
        return callback(new Error('Invalid water_parameters_id. Must be an integer.'), null);
    }
    if (water_parameters_id === '') {
        return callback(new Error('Invalid water_parameters_id. Must not be empty.'), null);
    }
    if (water_parameters_id === null) {
        return callback(new Error('Invalid water_parameters_id. Must not be null.'), null);
    }
    if (water_parameters_id === undefined) {
        return callback(new Error('Invalid water_parameters_id. Must not be undefined.'), null);
    }
    if (water_parameters_id === false) {
        return callback(new Error('Invalid water_parameters_id. Must not be false.'), null);
    }
    if (water_parameters_id === true) {
        return callback(new Error('Invalid water_parameters_id. Must not be true.'), null);
    }
    if (name === '') {
        return callback(new Error('Invalid name. Must not be empty.'), null);
    }
    if (name === null) {
        return callback(new Error('Invalid name. Must not be null.'), null);
    }
    if (name === undefined) {
        return callback(new Error('Invalid name. Must not be undefined.'), null);
    }
    if (name === false) {
        return callback(new Error('Invalid name. Must not be false.'), null);
    }
    if (name === true) {
        return callback(new Error('Invalid name. Must not be true.'), null);
    }

    const query = `
    INSERT INTO Water_parameter_value (name, param_value, water_parameters_id)  
    VALUES (?, ?, ?);`;
    db.query(query, [name, param_value, water_parameters_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update water param value by id of water and name of value
const updateWaterParamByIdAndName = (id, name, updateValue, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (typeof name !== 'string' || name.length === 0) {
        return callback(new Error('Invalid water parameter name'), null);
    }
    if (updateValue === undefined || updateValue === null || isNaN(updateValue)) { 
        return callback(new Error('Invalid input data. Param value is required and must be a number.'), null);
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
    if (name === '') {
        return callback(new Error('Invalid water parameter name. Must not be empty.'), null);
    }
    if (name === null) {
        return callback(new Error('Invalid water parameter name. Must not be null.'), null);
    }
    if (name === undefined) {
        return callback(new Error('Invalid water parameter name. Must not be undefined.'), null);
    }
    if (name === false) {
        return callback(new Error('Invalid water parameter name. Must not be false.'), null);
    }
    if (name === true) {
        return callback(new Error('Invalid water parameter name. Must not be true.'), null);
    }

    const query = `UPDATE Water_parameter_value SET param_value = ? WHERE water_parameters_id = ? AND name = ?;`;
    db.query(query, [updateValue, id, name], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete water param by id
const deleteWaterParam = (id, name, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid water parameter ID'), null);
    }
    if (typeof name !== 'string' || name.length === 0) {
        return callback(new Error('Invalid water parameter name'), null);
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
    if (name === '') {
        return callback(new Error('Invalid water parameter name. Must not be empty.'), null);
    }
    if (name === null) {
        return callback(new Error('Invalid water parameter name. Must not be null.'), null);
    }
    if (name === undefined) {
        return callback(new Error('Invalid water parameter name. Must not be undefined.'), null);
    }
    if (name === false) {
        return callback(new Error('Invalid water parameter name. Must not be false.'), null);
    }
    if (name === true) {
        return callback(new Error('Invalid water parameter name. Must not be true.'), null);
    }

    const query = `DELETE FROM Water_parameter_value WHERE water_parameters_id = ? AND name = ?;`;
    db.query(query, [id, name], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Get all water parameter values
const getAllWaterParams = (callback) => {
    const query = `SELECT * FROM Water_parameter_value;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

module.exports = {
    getWaterParamByIdAndName,
    createWaterParam,
    updateWaterParamByIdAndName,
    deleteWaterParam,
    getAllWaterParams
};