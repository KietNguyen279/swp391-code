const db = require('../config/db');

// Get koi by ID
const getKoiById = (id, callback) => {

    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === '') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === null) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === undefined) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === '0') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === ' ') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'null') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'undefined') {
        return callback(new Error('Invalid koi ID'), null);
    }

    const query = `
        SELECT k.*, u.name AS owner_name
        FROM Koi k
        JOIN User u ON k.user_id = u.id
        WHERE k.id = ?;
    `;
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

// Create koi
const createKoi = (name, image, body_shape, age, size, weight, gender, breed, origin, pond_id, callback) => {

    // Input validation
    if (!name || !image || !body_shape || age <= 0 || size <= 0 || weight <= 0 || !gender || !breed || !origin || pond_id <= 0) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    if (!['male', 'female'].includes(gender)) {
        return callback(new Error('Invalid gender value. Must be "male" or "female".'), null);
    }
    // Additional validation 
    if (typeof name !== 'string' || name.length < 2) {
        return callback(new Error('Invalid name. Name must be a string with at least 2 characters.'), null);
    }
    if (typeof image !== 'string' || image.length === 0) {
        return callback(new Error('Invalid image. Image URL must be a non-empty string.'), null);
    }
    if (typeof body_shape !== 'string' || body_shape.length === 0) {
        return callback(new Error('Invalid body_shape. Body shape must be a non-empty string.'), null);
    }
    if (typeof age !== 'number' || age <= 0) {
        return callback(new Error('Invalid age. Age must be a number greater than 0.'), null);
    }
    if (typeof size !== 'number' || size <= 0) {
        return callback(new Error('Invalid size. Size must be a number greater than 0.'), null);
    }
    if (typeof weight !== 'number' || weight <= 0) {
        return callback(new Error('Invalid weight. Weight must be a number greater than 0.'), null);
    }

    const query = `
      INSERT INTO Koi (name, image, body_shape, age, size, weight, gender, breed, origin, pond_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    db.query(query, [name, image, body_shape, age, size, weight, gender, breed, origin, pond_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update Koi by ID
const updateKoiById = (id, image, body_shape, age, size, weight, pond_id, callback) => {

    // Input validation
    if (!image || !body_shape || age <= 0 || size <= 0 || weight <= 0 || pond_id <= 0) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    // Additional validation 
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (typeof image !== 'string' || image.length === 0) {
        return callback(new Error('Invalid image. Image URL must be a non-empty string.'), null);
    }
    if (typeof body_shape !== 'string' || body_shape.length === 0) {
        return callback(new Error('Invalid body_shape. Body shape must be a non-empty string.'), null);
    }
    if (typeof age !== 'number' || age <= 0) {
        return callback(new Error('Invalid age. Age must be a number greater than 0.'), null);
    }
    if (typeof size !== 'number' || size <= 0) {
        return callback(new Error('Invalid size. Size must be a number greater than 0.'), null);
    }
    if (typeof weight !== 'number' || weight <= 0) {
        return callback(new Error('Invalid weight. Weight must be a number greater than 0.'), null
        );
    }
    if (isNaN(pond_id) || pond_id <= 0) {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === '') {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === null) {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === undefined) {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === 0) {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === '0') {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === ' ') {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === 'null') {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === 'undefined') {
        return callback(new Error('Invalid pond ID'), null);
    }
    if (pond_id === 'NaN') {
        return callback(new Error('Invalid pond ID'), null);
    }

    const query = `UPDATE Koi
    SET image = ?, body_shape = ?, age = ?, size = ?, weight = ?, pond_id = ?
    WHERE id = ?;`;
    db.query(query, [image, body_shape, age, size, weight, pond_id, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete Koi by ID
const deleteKoiById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === '') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === null) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === undefined) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === '0') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === ' ') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'null') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'undefined') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'NaN') {
        return callback(new Error('Invalid koi ID'), null);
    }

    const deleteGrowthRecordsQuery = `DELETE FROM Koi_growth_record WHERE koi_id = ?`;
    db.query(deleteGrowthRecordsQuery, [id], (error, deleteResult) => {
        if (error) {
            return callback(error, null);
        }

        const deleteKoiQuery = `DELETE FROM Koi WHERE id = ?`;
        db.query(deleteKoiQuery, [id], (error, koiResult) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, koiResult.affectedRows);
        });
    });
};

// Get all koi
const getAllKoi = (callback) => {
    const query = `SELECT * FROM Koi;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

// Get Koi With Food
const getKoiWithFoodById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === '') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === null) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === undefined) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 0) {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === '0') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === ' ') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'null') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'undefined') {
        return callback(new Error('Invalid koi ID'), null);
    }
    if (id === 'NaN') {
        return callback(new Error('Invalid koi ID'), null);
    }

    const query = `
        SELECT 
            k.*,
            ROUND(k.weight * 0.02, 2) AS food_required_kg_per_day 
        FROM 
            Koi k
        WHERE 
            k.id = ?;  
    `;
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

module.exports = {
    getKoiById,
    createKoi,
    updateKoiById,
    deleteKoiById,
    getAllKoi,
    getKoiWithFoodById
};