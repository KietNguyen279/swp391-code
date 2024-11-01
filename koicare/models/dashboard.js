const db = require("../config/db");

// Get water parameters for a specific pond
const getWaterParametersByPondId = (pondId, callback) => {
  const query = "SELECT wp.id, wp.measurement_time, wp.pond_id, wpv.param_value AS temperature, wpv.param_value AS ph, wpv.param_value AS salinity, wpv.param_value AS o2, wpv.param_value AS no2, wpv.param_value AS no3, wpv.param_value AS no4 FROM Water_parameters wp JOIN Water_parameter_value wpv ON wp.id = wpv.water_parameters_id WHERE wp.pond_id = ?;";
  db.query(query, [pondId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Create water parameters for a specific pond
const createWaterParametersForPond = (pondId, waterInfo, callback) => {
  const query = `
        INSERT INTO Water_parameters (pond_id, measurement_time) 
        VALUES (?, ?);
    `;
  const values = [pondId, waterInfo.date];

  db.query(query, values, (error, results) => {
    if (error) {
      return callback(error, null);
    }

    const waterParamId = results.insertId; 

    const insertValues = waterInfo.map((data) => [
      data.param_name,
      data.param_value,
      waterParamId,
    ]);

    const insertQuery = `
        INSERT INTO Water_parameter_value (name, param_value, water_parameters_id) 
        VALUES ?;
    `;

    db.query(insertQuery, [insertValues], (error) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, { message: "Water parameters created", id: waterParamId });
    });
  });
};

// Update water parameters by ID
const updateWaterParameterById = (id, pondId, waterInfo, callback) => {
  const query = `
        UPDATE Water_parameter_value 
        SET param_value = ? 
        WHERE id = ? AND water_parameters_id IN (SELECT id FROM Water_parameters WHERE pond_id = ?);
    `;
  const values = [waterInfo.param_value, id, pondId];

  db.query(query, values, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Delete water parameter by ID
const deleteWaterParameterById = (id, pondId, callback) => {
  const query = `
        DELETE FROM Water_parameter_value 
        WHERE id = ? AND water_parameters_id IN (SELECT id FROM Water_parameters WHERE pond_id = ?);
    `;
  db.query(query, [id, pondId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

module.exports = {
  getWaterParametersByPondId,
  createWaterParametersForPond,
  updateWaterParameterById,
  deleteWaterParameterById,
};