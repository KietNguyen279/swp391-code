const db = require("../config/db");

// Get pond by ID
const getPondById = (id, callback) => {
    const query = `SELECT p.id, p.name, p.image, p.size, p.depth, p.volume, 
                  p.num_of_drains, p.pump_capacity, p.salt_kg_required, 
                  k.id as koi_id
                  FROM Pond p
                  LEFT JOIN Koi k ON p.id = k.pond_id 
                  WHERE p.id = ?;`;
    db.query(query, [id], (error, results) => {
        if (error) return callback(error, null);
        const pondInfo =
            results.length > 0
                ? {
                      id: results[0].id,
                      name: results[0].name,
                      image: results[0].image,
                      size: results[0].size,
                      depth: results[0].depth,
                      volume: results[0].volume,
                      num_of_drains: results[0].num_of_drains,
                      pump_capacity: results[0].pump_capacity,
                      salt_kg_required: results[0].salt_kg_required,
                      kois: results
                          .map((result) => result.koi_id)
                          .filter((id) => id),
                  }
                : null;
        return callback(null, pondInfo);
    });
};

// Create pond
const createPond = (
    name,
    image,
    size,
    depth,
    volume,
    num_of_drains,
    pump_capacity,
    user_id,
    callback
) => {
    const salt_kg_required = Math.round(volume * 0.003);
    const query = `
    INSERT INTO Pond (name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, salt_kg_required)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

    // Inserting the pond and retrieving its ID
    db.query(
        query,
        [
            name,
            image,
            size,
            depth,
            volume,
            num_of_drains,
            pump_capacity,
            user_id,
            salt_kg_required,
        ],
        (error, results) => {
            if (error) return callback(error, null);

            // If successful, retrieve and return the new pond's ID
            const newPondId = results.insertId;
            return callback(null, { id: newPondId });
        }
    );
};

// Update pond by ID
const updatePondById = (id, updates, callback) => {
    try {
        const {
            name,
            image,
            size,
            depth,
            volume,
            num_of_drains,
            pump_capacity,
        } = updates;

        if (
            !name &&
            !image &&
            !size &&
            !depth &&
            !volume &&
            !num_of_drains &&
            !pump_capacity
        ) {
            throw new Error("No fields to update.");
        }

        const updateFields = [];
        const updateValues = [];

        if (name !== undefined) {
            updateFields.push("name = ?");
            updateValues.push(name);
        }
        if (image !== undefined) {
            updateFields.push("image = ?");
            updateValues.push(image);
        }

        const salt_kg_required =
            volume !== undefined ? Math.round(volume * 0.003) : undefined;
        if (salt_kg_required !== undefined) {
            updateFields.push("salt_kg_required = ?");
            updateValues.push(salt_kg_required);
        }

        const query = `UPDATE Pond SET ${updateFields.join(", ")} WHERE id = ?`;
        db.query(query, [...updateValues, id], (error, results) => {
            if (error) return callback(error, null);
            return callback(null, results.affectedRows);
        });
    } catch (error) {
        return callback(error, null);
    }
};

// Delete pond by ID
const deletePondById = (id, callback) => {

    const query = `DELETE FROM Pond WHERE id = ?`;
    db.query(query, [id], (error, results) => {
        if (error) {
            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return callback(
                    new Error(
                        "Cannot delete pond. There are koi associated with this pond."
                    ),
                    null
                );
            }
            return callback(error, null);
        }
        return results.affectedRows === 0
            ? callback(new Error("Pond not found."), null)
            : callback(null, results.affectedRows);
    });
};

// Get all ponds
const getAllPonds = (callback) => {
    const query = `
    SELECT p.*, 
    (SELECT COUNT(*) FROM Koi WHERE Koi.pond_id = p.id) AS totalFish
    FROM Pond p;
  `;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error);
        }

        const formattedResults = results.map((row) => ({
            id: row.id,
            name: row.name,
            image: row.image,
            totalFish: row.totalFish,
        }));

        callback(null, results);
    });
};

// Get pond details
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
            console.error("Error executing query:", error);
            return callback(error, null);
        }
        // Check if results are found
        if (results.length > 0) {
            return callback(null, results[0]); // Return the first result
        } else {
            return callback(null, null); // No results found
        }
    });
};

module.exports = {
    getPondById,
    createPond,
    updatePondById,
    deletePondById,
    getAllPonds,
    getPondDetails,
};
