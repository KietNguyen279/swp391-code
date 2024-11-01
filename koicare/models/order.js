const db = require("../config/db");

// Create a new order
const createOrder = (userId, callback) => {
  const query = `
    INSERT INTO \`Order\` (order_date, user_id) 
    VALUES (NOW(), ?);
  `;
  db.query(query, [userId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.insertId);
  });
};

// Get order by ID
const getOrderById = (id, callback) => {
  const query = `
    SELECT * FROM \`Order\` WHERE id = ?;
  `;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results[0]);
  });
};

// Update order status
const updateOrderStatus = (id, status, callback) => {
  const query = `
    UPDATE \`Order\` 
    SET status = ? 
    WHERE id = ?;
  `;
  db.query(query, [status, id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
};