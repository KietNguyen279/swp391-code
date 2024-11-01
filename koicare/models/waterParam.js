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
    const values = [pondId, waterParams.date, waterParams.temt, waterParams.ph, waterParams.salinity, waterParams.o2, waterParams.no2, waterParams.no3, waterParams.po4];
    const query =
      "INSERT INTO Water_parameters (pond_id, date, temt, ph, salinity, o2, no2, no3, po4) VALUES (?,?,?,?,?,?,?,?,?)";

    db.query(query, values, (error, results) => {
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
