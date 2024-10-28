const db = require('../config/db');

// Create user 
const createUser = (userData, callback) => {
    const { name, email, password, role } = userData;
    if (!name || !email || !password) {
        return callback(new Error('Invalid input data'), null);
    }

    const query = `INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, password, role], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Get user by ID
const getUserById = (id, callback) => {
    const query = `SELECT id, name, email, role FROM User WHERE id = ?`;
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

// Get user by email (used for login)
const getUserByEmail = (email, callback) => {
    const query = `SELECT * FROM User WHERE email = ?`;
    db.query(query, [email], (error, results) => {
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

// Update User
const updateUserById = (id, updatedUserData, callback) => {
    if (updatedUserData.name && updatedUserData.name.length === 0) {
        return callback(new Error('Name cannot be empty'), null);
    }
    if (updatedUserData.email && !isValidEmail(updatedUserData.email)) {
        return callback(new Error('Invalid email format'), null);
    }
    const query = `UPDATE User SET ? WHERE id = ?`;
    db.query(query, [updatedUserData, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Check valid email
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
}

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById
};