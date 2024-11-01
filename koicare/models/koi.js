const db = require("../config/db");

// Get koi by ID
const getKoiById = (id, callback) => {
  const query = `
      SELECT k.*, u.name AS owner_name
      FROM Koi k
      JOIN User u ON k.user_id = u.id
      WHERE k.id = ?;
  `;

  db.query(query, [id], (error, results) => {
    if (error) return callback(error);
    return callback(null, results.length > 0 ? results[0] : null);
  });
};

// Create Koi
const createKoi = (
  name,
  image,
  body_shape,
  age,
  size,
  weight,
  gender,
  breed,
  origin,
  pond_id,
  callback
) => {
  if (
    !name ||
    !image ||
    !body_shape ||
    !gender ||
    !breed ||
    !origin
  ) {
    return callback(
      new Error("Invalid input data. Please check all fields."),
      null
    );
  }

  if (!["male", "female"].includes(gender)) {
    return callback(
      new Error('Invalid gender value. Must be "male" or "female".'),
      null
    );
  }

  const food_required_kg_per_day = Math.round(weight * 0.02);

  const query = `
      INSERT INTO Koi (name, image, body_shape, age, size, weight, gender, breed, origin, pond_id, food_required_kg_per_day)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  db.query(
    query,
    [
      name,
      image,
      body_shape,
      age,
      size,
      weight,
      gender,
      breed,
      origin,
      pond_id,
      food_required_kg_per_day,
    ],
    (error, results) => {
      if (error) return callback(error);
      return callback(null, results.affectedRows);
    }
  );
};

// Update Koi by ID
const updateKoiById = (
  id,
  image,
  body_shape,
  age,
  size,
  weight,
  pond_id,
  callback
) => {
  if (
    !id ||
    !image ||
    !body_shape ||
    !age ||
    !size ||
    !weight ||
    !pond_id
  ) {
    return callback(
      new Error("Invalid input data. Please check all fields."),
      null
    );
  }

  const food_required_kg_per_day = Math.round(weight * 0.02);

  const query = `UPDATE Koi
    SET image = ?, body_shape = ?, age = ?, size = ?, weight = ?, pond_id = ?, food_required_kg_per_day = ?
    WHERE id = ?;`;

  db.query(
    query,
    [
      image,
      body_shape,
      age,
      size,
      weight,
      pond_id,
      food_required_kg_per_day,
      id,
    ],
    (error, results) => {
      if (error) return callback(error);
      return callback(null, results.affectedRows);
    }
  );
};

// Delete Koi by ID
const deleteKoiById = (id, callback) => {
  const deleteGrowthRecordsQuery = `DELETE FROM Koi_growth_record WHERE koi_id = ?`;
  db.query(deleteGrowthRecordsQuery, [id], (error) => {
    if (error) return callback(error);

    const deleteKoiQuery = `DELETE FROM Koi WHERE id = ?`;
    db.query(deleteKoiQuery, [id], (error, koiResult) => {
      if (error) return callback(error);
      return callback(null, koiResult.affectedRows);
    });
  });
};

// Get all koi
const getAllKoi = (callback) => {
  const query = `SELECT * FROM Koi;`;
  db.query(query, (error, results) => {
    if (error) return callback(error);
    return callback(null, results);
  });
};

// Get Koi With Food
const getKoiWithFoodById = (id, callback) => {
  const query = `
        SELECT 
            k.*, ROUND(k.weight * 0.02, 2) AS food_required_kg_per_day 
        FROM 
            Koi k
        WHERE 
            k.id = ?;  
    `;

  db.query(query, [id], (error, results) => {
    if (error) return callback(error);
    return callback(null, results.length > 0 ? results[0] : null);
  });
};

module.exports = {
  getKoiById,
  createKoi,
  updateKoiById,
  deleteKoiById,
  getAllKoi,
  getKoiWithFoodById,
};