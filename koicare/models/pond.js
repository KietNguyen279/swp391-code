const db = require('../config/db');

// Get pond by ID
const getPondById = (id, callback) => {
  // Input validation
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid pond ID'), null);
  }

  const query = `SELECT * FROM Pond WHERE id = ?;`;
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

// Create pond
const createPond = (name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, callback) => {

  // Input validation
  if (!name || !image || size <= 0 || depth <= 0 || volume <= 0 || num_of_drains <= 0 || pump_capacity <= 0 || !user_id) {
    return callback(new Error('Invalid input data. Please check all fields.'), null);
  }
  // Additional validation 
  if (typeof name !== 'string' || name.length === 0) {
    return callback(new Error('Invalid name'), null);
  }
  if (typeof image !== 'string' || image.length === 0) {
    return callback(new Error('Invalid image URL'), null);
  }
  if (typeof size !== 'number' || size <= 0) {
    return callback(new Error('Invalid size'), null);
  }
  if (typeof depth !== 'number' || depth <= 0) {
    return callback(new Error('Invalid depth'), null);
  }
  if (typeof volume !== 'number' || volume <= 0) {
    return callback(new Error('Invalid volume'), null);
  }
  if (typeof num_of_drains !== 'number' || num_of_drains <= 0) {
    return callback(new Error('Invalid number of drains'), null);
  }
  if (typeof pump_capacity !== 'number' || pump_capacity <= 0) {
    return callback(new Error('Invalid pump capacity'), null);
  }
  if (typeof user_id !== 'number' || user_id <= 0) {
    return callback(new Error('Invalid user ID'), null);
  }

  const query = `
    INSERT INTO Pond (name, image, size, depth, volume, num_of_drains, pump_capacity, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
  db.query(query, [name, image, size, depth, volume, num_of_drains, pump_capacity, user_id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Update pond by ID
const updatePondById = (id, name, image, size, depth, volume, num_of_drains, pump_capacity, callback) => {

  if (name !== undefined && !name) {
    return callback(new Error('Invalid input data: Name cannot be empty.'), null);
  }
  if (image !== undefined && !image) {
    return callback(new Error('Invalid input data: Image cannot be empty.'), null);
  }
  if (size !== undefined && size <= 0) {
    return callback(new Error('Invalid input data: Size must be a positive number.'), null);
  }
  if (depth !== undefined && depth <= 0) {
    return callback(new Error('Invalid input data: Depth must be a positive number.'), null);
  }
  if (volume !== undefined && volume <= 0) {
    return callback(new Error('Invalid input data: Volume must be a positive number.'), null);
  }
  if (num_of_drains !== undefined && num_of_drains <= 0) {
    return callback(new Error('Invalid input data: Number of drains must be a positive number.'), null);
  }
  if (pump_capacity !== undefined && pump_capacity <= 0) {
    return callback(new Error('Invalid input data: Pump capacity must be a positive number.'), null);
  }

  const updateFields = [];
  const updateValues = [];

  if (name !== undefined) { updateFields.push('name = ?'); updateValues.push(name); }
  if (image !== undefined) { updateFields.push('image = ?'); updateValues.push(image); }
  if (size !== undefined) { updateFields.push('size = ?'); updateValues.push(size); }
  if (depth !== undefined) { updateFields.push('depth = ?'); updateValues.push(depth); }
  if (volume !== undefined) { updateFields.push('volume = ?'); updateValues.push(volume); }
  if (num_of_drains !== undefined) { updateFields.push('num_of_drains = ?'); updateValues.push(num_of_drains); }
  if (pump_capacity !== undefined) { updateFields.push('pump_capacity = ?'); updateValues.push(pump_capacity); }

  if (updateFields.length === 0) {
    return callback(new Error('No fields to update.'), null);
  }

  const query = `UPDATE Pond SET ${updateFields.join(', ')} WHERE id = ?`;
  db.query(query, [...updateValues, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Delete pond by ID
const deletePondById = (id, callback) => {
  // Input validation
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid pond ID'), null);
  }

  const query = `DELETE FROM Pond WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return callback(new Error('Cannot delete pond. There are koi associated with this pond.'), null);
      }
      return callback(error, null);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('Pond not found.'), null);
    } else {
      return callback(null, results.affectedRows);
    }
  });
};

// Get all pond
const getAllPonds = (callback) => {
  const query = `SELECT * FROM Pond;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Calculate salt amount 
const getPondDetails = (pondId, callback) => {
  const query = `
      SELECT 
        p.id AS pond_id,
        p.name AS pond_name,
        COUNT(k.id) AS koi_count,  
        ROUND(p.volume * 0.003, 2) AS salt_kg_required 
      FROM 
        Pond p
      LEFT JOIN 
        Koi k ON p.id = k.pond_id
      WHERE 
        p.id = ? 
      GROUP BY 
        p.id, p.name;
    `;
  db.query(query, [pondId], (error, results) => {
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

module.exports = {
  getPondById,
  createPond,
  updatePondById,
  deletePondById,
  getAllPonds,
  getPondDetails
};