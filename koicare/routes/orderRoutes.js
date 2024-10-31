const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { verifyMemberAndShopRole, verifyAdminAndShopRole } = require('../middleware/authMiddleware');

// Create a new order
router.post('/', verifyMemberAndShopRole, (req, res) => {
  const userId = req.userId;
  const { orderItems } = req.body;

  // Input validation
  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({ message: 'Invalid request data. orderItems must be a non-empty array.' });
  }

  // Additional validation for each order item
  for (const item of orderItems) {
    if (isNaN(item.product_id) || item.product_id <= 0 || isNaN(item.quantity) || item.quantity <= 0 || isNaN(item.price) || item.price <= 0) {
      return res.status(400).json({ message: 'Invalid order item data. Please check product_id, quantity, and price.' });
    }
    if (item.price < 0.01 || item.price > 99999.99) {
      return res.status(400).json({ message: 'Price of a product must be between 0.01 and 99999.99' });
    }
  }
  if (orderItems.length !== new Set(orderItems.map(item => item.product_id)).size) {
    return res.status(400).json({ message: 'Duplicate product IDs in order items' });
  }
  if (orderItems.some(item => item.quantity > 100)) {
    return res.status(400).json({ message: 'Quantity of a product cannot exceed 100' });
  }
  if (orderItems.some(item => item.quantity <= 0)) {
    return res.status(400).json({ message: 'Quantity of a product must be greater than 0' });
  }
  if (orderItems.some(item => item.price <= 0)) {
    return res.status(400).json({ message: 'Price of a product must be greater than 0' });
  }

  Order.createOrder(userId, orderItems, (error, orderId) => {
    if (error) {
      console.error('Error creating order:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ message: 'Invalid product ID in order items' });
      } else {
        return res.status(500).json({ error: error.toString() });
      }
    }
    res.status(201).json({ message: 'Order created successfully', orderId });
  });
});

// Get order by ID
router.get('/:id', verifyMemberAndShopRole, (req, res) => {
  const orderId = req.params.id;
  // Input validation
  if (isNaN(orderId) || orderId <= 0) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  Order.getOrderById(orderId, (error, order) => {
    if (error) {
      console.error('Error fetching order:', error);
      return res.status(500).json({ error: error.toString() });
    }
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  });
});

// Update an order by ID
router.put('/:id', verifyMemberAndShopRole, (req, res) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;

  // Input validation
  if (isNaN(orderId) || orderId <= 0) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }
  const { orderItems, status } = updatedOrderData;
  if (status && !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid order status' });
  }
  if (orderItems && Array.isArray(orderItems)) {
    for (const item of orderItems) {
      if (isNaN(item.product_id) || item.product_id <= 0 || isNaN(item.quantity) || item.quantity <= 0 || isNaN(item.price) || item.price <= 0) {
        return res.status(400).json({ message: 'Invalid order item data. Please check product_id, quantity, and price.' });
      }
    }
  }
  if (orderItems && orderItems.length !== new Set(orderItems.map(item => item.product_id)).size) {
    return res.status(400).json({ message: 'Duplicate product IDs in order items' });
  }
  if (orderItems && orderItems.some(item => item.quantity > 100)) {
    return res.status(400).json({ message: 'Quantity of a product cannot exceed 100' });
  }
  if (orderItems && orderItems.some(item => item.quantity <= 0)) {
    return res.status(400).json({ message: 'Quantity of a product must be greater than 0' });
  }
  if (orderItems && orderItems.some(item => item.price <= 0)) {
    return res.status(400).json({ message: 'Price of a product must be greater than 0' });
  }
  if (orderItems && orderItems.some(item => item.product_id <= 0)) {
    return res.status(400).json({ message: 'Invalid product ID in order items' });
  }

  Order.updateOrderById(orderId, updatedOrderData, (error, result) => {
    if (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    if (result === 1) {
      res.json({ message: 'Order updated successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
});

// Delete an order by ID
router.delete('/:id', verifyMemberAndShopRole, (req, res) => {
  const orderId = req.params.id;

  // Input validation
  if (isNaN(orderId) || orderId <= 0) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  
  Order.deleteOrderById(orderId, (error, result) => {
    if (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    if (result === 1) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
});

// Get all orders
router.get('/', verifyAdminAndShopRole, (req, res) => {
  Order.getAllOrders((error, orders) => {
    if (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(orders);
  });
});

module.exports = router;