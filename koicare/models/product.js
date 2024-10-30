const db = require('../config/db');

// Get product by ID
const getProductById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid product ID'), null);
    }

    const query = `SELECT * FROM Product WHERE id = ?;`;
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

// Create product
const createProduct = (name, image, description, price, quantity, callback) => {

    if (!name || !image || !description || !price || !quantity) {
        return callback(new Error('Missing required fields'), null);
    }
    if (price <= 0) {
        return callback(new Error('Price must be greater than 0'), null);
    }
    if (quantity < 0) {
        return callback(new Error('Quantity cannot be smaller than 0'), null);
    }
    if (typeof name !== 'string' || name.length === 0) {
        return callback(new Error('Invalid name'), null);
    }
    if (typeof image !== 'string' || image.length === 0) {
        return callback(new Error('Invalid image URL'), null);
    }
    if (typeof description !== 'string' || description.length === 0) {
        return callback(new Error('Invalid description'), null);
    }
    if (typeof price !== 'number' || price <= 0) {
        return callback(new Error('Invalid price'), null);
    }
    const query = `
        INSERT INTO Product (name, image, description, price, quantity)
        VALUES (?, ?, ?, ?, ?);`;
    db.query(query, [name, image, description, price, quantity], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update product by ID
const updateProductById = (id, name, image, description, price, quantity, callback) => {

    // Input validation
    if (!name || !image || !description || !price || !quantity) {
        return callback(new Error('Missing required fields'), null);
    }
    // Additional validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid product ID'), null);
    }
    if (typeof name !== 'string' || name.length === 0) {
        return callback(new Error('Invalid name'), null);
    }
    if (typeof image !== 'string' || image.length === 0) {
        return callback(new Error('Invalid image URL'), null);
    }
    if (typeof description !== 'string' || description.length === 0) {
        return callback(new Error('Invalid description'), null);
    }
    if (price <= 0) {
        return callback(new Error('Invalid price'), null);
    }
    if (quantity < 0) {
        return callback(new Error('Invalid quantity'), null);
    }

    const query = `UPDATE Product
  SET name = ?, image = ?, description = ?, price = ?, quantity = ?
  WHERE id = ?;`;
    db.query(query, [name, image, description, price, quantity, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete product by ID
const deleteProductById = (id, callback) => {
    // Input validation
    if (isNaN(id) || id <= 0) {
        return callback(new Error('Invalid product ID'), null);
    }

    const query = `DELETE FROM Product WHERE id = ?;`;
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.affectedRows === 0) {
            return callback(new Error('Product not found.'), null);
        } else {
            return callback(null, results.affectedRows);
        }
    });
};

// Get all products
const getAllProducts = (callback) => {
    const query = `SELECT * FROM Product;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

module.exports = {
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    getAllProducts
};