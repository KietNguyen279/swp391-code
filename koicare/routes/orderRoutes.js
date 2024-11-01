const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { verifyAdminRole } = require("../middleware/authMiddleware");

// Create a new order
router.post("/", verifyAdminRole, (req, res) => {
  const userId = req.body.user_id; // Assuming user_id is sent in request body
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  Order.createOrder(userId, (error, orderId) => {
    if (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Order created", id: orderId });
  });
});

// Get order by ID
router.get("/:id", verifyAdminRole, (req, res) => {
  const orderId = req.params.id;

  Order.getOrderById(orderId, (error, order) => {
    if (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ message: "Internal server error" });
    } else if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  });
});

// Update order status
router.put("/:id", verifyAdminRole, (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  // Input validation
  if (!status) {
    return res.status(400).json({ message: "Status is required." });
  }

  Order.updateOrderStatus(orderId, status, (error, result) => {
    if (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: "Internal server error" });
    } else if (result === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated" });
  });
});

module.exports = router;