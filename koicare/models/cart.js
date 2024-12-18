const db = require('../config/db');
const Product = require('../models/product');

// Get cart by user id
const getCartByUserId = (userId, callback) => {
  // Input validation
  if (isNaN(userId) || userId <= 0) {
    return callback(new Error('Invalid user ID'), null);
  }

  const query = `
    SELECT c.id AS cart_id, c.user_id, ci.product_id, ci.quantity, p.name, p.price 
    FROM Cart c
    LEFT JOIN Cart_item ci ON c.id = ci.cart_id
    LEFT JOIN Product p ON ci.product_id = p.id
    WHERE c.user_id = ?;
  `;
  db.query(query, [userId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    const cart = processCartItems(results);
    return callback(null, cart);
  });
};

// Function to process cart items
const processCartItems = (items) => {
  const cart = {
    cart_id: null,
    user_id: null,
    items: []
  };
  if (items.length > 0) {
    cart.cart_id = items[0].cart_id;
    cart.user_id = items[0].user_id;
    for (const item of items) {
      cart.items.push({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    }
  }
  return cart;
};

// Add item to cart
const addItemToCart = (userId, productId, quantity, callback) => {

  if (quantity <= 0) {
    return callback(new Error('Quantity must be greater than 0'), null);
  }
  if (isNaN(userId) || userId <= 0) {
    return callback(new Error('Invalid user ID'), null);
  }
  if (isNaN(productId) || productId <= 0) {
    return callback(new Error('Invalid product ID'), null);
  }
  if (quantity % 1 !== 0) {
    return callback(new Error('Quantity must be a whole number'), null);
  }

  // Check if product exists 
  Product.getProductById(productId, (productError, product) => {
    if (productError) {
      return callback(productError, null);
    }
    if (!product) {
      return callback(new Error('Product not found'), null);
    }

    const query = `
      INSERT INTO Cart_item (cart_id, product_id, quantity) 
      SELECT c.id, ?, ? FROM Cart c WHERE c.user_id = ?  
      ON DUPLICATE KEY UPDATE quantity = quantity + ?;
    `;
    db.query(query, [productId, quantity, userId, quantity], (error, results) => {
      if (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
          if (error.message.includes('for key \'cart_id\'')) {
            return callback(new Error('Invalid cart ID'), null);
          } else if (error.message.includes('for key \'product_id\'')) {
            return callback(new Error('Invalid product ID'), null);
          }
        }
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  });
};

// Update item quantity in cart
const updateCartItemQuantity = (userId, productId, quantity, callback) => {
  // Input validation
  if (isNaN(userId) || userId <= 0) {
    return callback(new Error('Invalid user ID'), null);
  }
  if (isNaN(productId) || productId <= 0) {
    return callback(new Error('Invalid product ID'), null);
  }
  if (quantity <= 0) {
    return callback(new Error('Quantity must be a positive integer'), null);
  }
  if (quantity % 1 !== 0) {
    return callback(new Error('Quantity must be a whole number'), null);
  }

  const query = `
      UPDATE Cart_item 
      SET quantity = ? 
      WHERE cart_id = (SELECT id FROM Cart WHERE user_id = ?) AND product_id = ?;
    `;
  db.query(query, [quantity, userId, productId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

// Remove item from cart
const removeItemFromCart = (userId, productId, callback) => {
  // Input validation
  if (isNaN(userId) || userId <= 0) {
    return callback(new Error('Invalid user ID'), null);
  }
  if (isNaN(productId) || productId <= 0) {
    return callback(new Error('Invalid product ID'), null);
  }
  if (productId % 1 !== 0) {
    return callback(new Error('Product ID must be a whole number'), null);
  }
  if (userId % 1 !== 0) {
    return callback(new Error('User ID must be a whole number'), null);
  }
  if (productId <= 0) {
    return callback(new Error('Product ID must be greater than 0'), null);
  }
  if (userId <= 0) {
    return callback(new Error('User ID must be greater than 0'), null);
  }
  if (productId === null) {
    return callback(new Error('Product ID cannot be null'), null);
  }
  if (userId === null) {
    return callback(new Error('User ID cannot be null'), null);
  }
  if (productId === undefined) {
    return callback(new Error('Product ID cannot be undefined'), null);
  }
  if (userId === undefined) {
    return callback(new Error('User ID cannot be undefined'), null);
  }
  if (productId === '') {
    return callback(new Error('Product ID cannot be empty'), null);
  }
  if (userId === '') {
    return callback(new Error('User ID cannot be empty'), null);
  }
  if (productId === ' ') {
    return callback(new Error('Product ID cannot be a space'), null);
  }
  if (userId === ' ') {
    return callback(new Error('User ID cannot be a space'), null);
  }

  const query = `
      DELETE FROM Cart_item 
      WHERE cart_id = (SELECT id FROM Cart WHERE user_id = ?) AND product_id = ?;
    `;
  db.query(query, [userId, productId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.affectedRows === 0) {
      return callback(new Error('Item not found.'), null);
    } else {
      return callback(null, results.affectedRows);
    }
  });
};

module.exports = {
  getCartByUserId,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart
};

