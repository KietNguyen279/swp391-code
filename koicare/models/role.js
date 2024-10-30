const db = require('../config/db');

// Get all roles
const getAllRoles = (callback) => {
  const query = `SELECT * FROM Role;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Get role by ID
const getRoleById = (id, callback) => {
  // Input validation
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid role ID'), null);
  }

  const query = `SELECT * FROM Role WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(new Error('Role not found'), null);
    }
  });
};

// Create a new role
const createRole = (name, callback) => {
  // Input validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return callback(new Error('Invalid role name. Name must be a non-empty string.'), null);
  }

  const query = `INSERT INTO Role (name) VALUES (?)`;
  db.query(query, [name], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Update role by ID
const updateRoleById = (id, updatedRoleData, callback) => {
  // Input validation
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid role ID'), null);
  }
  if (!updatedRoleData.name || typeof updatedRoleData.name !== 'string' || updatedRoleData.name.trim().length === 0) {
    return callback(new Error('Invalid role name. Name must be a non-empty string.'), null);
  }

  const query = `UPDATE Role SET ? WHERE id = ?`;
  db.query(query, [updatedRoleData, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('Role not found'), null);
    }
    return callback(null, results.affectedRows);
  });
};

// Delete role by ID
const deleteRoleById = (id, callback) => {
  // Input validation
  if (isNaN(id) || id <= 0) {
    return callback(new Error('Invalid role ID'), null);
  }

  const query = `DELETE FROM Role WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('Role not found'), null);
    }
    return callback(null, results.affectedRows);
  });
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRoleById,
  deleteRoleById
};