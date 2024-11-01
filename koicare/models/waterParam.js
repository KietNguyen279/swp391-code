const db = require("../config/db"); 

const WaterParam = {
  // Get water parameters 
  getWaterParametersByPondId: (pondId, callback) => {
    const query = "SELECT * FROM Water_parameters WHERE pond_id = ?";
    db.query(query, [pondId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  // Create water parameters 
  createWaterParametersForPond: (pondId, waterParams, callback) => {
    const query =
      "INSERT INTO Water_parameters (pond_id, param_name, param_value) VALUES ?";
    const values = waterParams.map((param) => [
      pondId,
      param.param_name,
      param.param_value,
    ]);

    db.query(query, [values], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  // Update a water parameter by ID
  updateWaterParameterById: (paramId, pondId, data, callback) => {
    const query =
      "UPDATE Water_parameters SET param_value = ? WHERE id = ? AND pond_id = ?";
    db.query(query, [data.param_value, paramId, pondId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  },

  // Delete a water parameter by ID
  deleteWaterParameterById: (paramId, pondId, callback) => {
    const query = "DELETE FROM Water_parameters WHERE id = ? AND pond_id = ?";
    db.query(query, [paramId, pondId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  },
};

module.exports = WaterParam;
