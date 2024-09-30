const db = require('../config/db');

// Get water param value by water param id and name of param
const getWaterParamByIdAndName = (id, name, callback) => {
    const query = `SELECT param_value FROM Water_parameter_value WHERE water_parameters_id = ? AND name = '?';`;
    db.query(query, [id, name], (error, results) => {
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

// Update water param value by id and name of value
const updateWaterParamByIdAndName = (id, name, updateValue, callback) => {
    const query = `UPDATE Water_parameter_value SET param_value = ? WHERE water_parameters_id = ? AND name = '?';`;
    db.query(query, [updateValue, id, name], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

module.exports = {
    getWaterParamByIdAndName,
    updateWaterParamByIdAndName
};