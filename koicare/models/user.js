const db = require('../config/db');

// Create user 
const createUser = (userData, callback) => {
    const { name, email, password, role } = userData;
    // Input validation
    if (!name || !email || !password || !role) {
        return callback(new Error('Missing required fields'), null);
    }
    // Additional validation 
    if (typeof name !== 'string' || name.length < 2) {
        return callback(new Error('Invalid name. Name must be a string with at least 2 characters.'), null);
    }
    if (typeof email !== 'string' || !isValidEmail(email)) {
        return callback(new Error('Invalid email format. Must be a @gmail.com email.'), null);
    }
    if (typeof password !== 'string' || password.length < 6) {
        return callback(new Error('Invalid password. Password must be at least 6 characters long.'), null);
    }
    if (typeof role !== 'string') {
        return callback(new Error('Invalid role. Role must be a string.'), null);
    }
    if (role !== 'GUEST' && role !== 'MEMBER' && role !== 'SHOP' && role !== 'ADMIN') {
        return callback(new Error('Invalid role. Role must be GUEST, MEMBER, SHOP, or ADMIN.'), null);
    }
    // Check if email already exists
    const query = `SELECT * FROM User WHERE email = ?`;
    db.query(query, [email], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.length > 0) {
            return callback(new Error('Email already exists'), null);
        }

        const query = `INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)`;
        db.query(query, [name, email, password, role], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results.affectedRows);
        });
    });
};

// Get user by ID
const getUserById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid user ID'), null);
    }

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
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid user ID'), null);
    }
    if (updatedUserData.name && (typeof updatedUserData.name !== 'string' || updatedUserData.name.length === 0)) {
        return callback(new Error('Invalid name. Name must be a non-empty string.'), null);
    }
    if (updatedUserData.email && (typeof updatedUserData.email !== 'string' || !isValidEmail(updatedUserData.email))) {
        return callback(new Error('Invalid email format. Must be a @gmail.com email.'), null);
    }
    if (updatedUserData.password && (typeof updatedUserData.password !== 'string' || updatedUserData.password.length < 6)) {
        return callback(new Error('Invalid password. Password must be at least 6 characters long.'), null);
    }
    if (updatedUserData.role && (typeof updatedUserData.role !== 'string' || (updatedUserData.role !== 'GUEST' && updatedUserData.role !== 'MEMBER' && updatedUserData.role !== 'SHOP' && updatedUserData.role !== 'ADMIN'))) {
        return callback(new Error('Invalid role. Role must be GUEST, MEMBER, SHOP, or ADMIN.'), null);
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