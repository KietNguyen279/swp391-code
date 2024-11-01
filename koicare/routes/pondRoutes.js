const express = require("express");
const router = express.Router();
const Pond = require("../models/pond");
const { verifyMemberAndShopAndAdminRole } = require("../middleware/authMiddleware");

// Get pond by ID
router.get("/:id", (req, res) => {
  const pondId = req.params.id;
  if (isNaN(pondId) || pondId <= 0) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  Pond.getPondById(pondId, (error, pond) => {
    if (error) {
      console.error("Error fetching pond:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return pond ? res.json(pond) : res.status(404).json({ message: "Pond not found" });
  });
});

// Create pond
router.post("/", verifyMemberAndShopAndAdminRole, (req, res) => {
  const { name, image, size, depth, volume, num_of_drains, pump_capacity } = req.body;
  
  Pond.createPond(name, image, size, depth, volume, num_of_drains, pump_capacity, req.user.id, (error, affectedRows) => {
    if (error) {
      console.error("Error creating pond:", error);
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).json({ message: "Pond created successfully", affectedRows });
  });
});

// Update pond by ID
router.put("/:id", verifyMemberAndShopAndAdminRole, (req, res) => {
  const pondId = req.params.id;
  if (isNaN(pondId) || pondId <= 0) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  
  Pond.updatePondById(pondId, req.body, (error, affectedRows) => {
    if (error) {
      console.error("Error updating pond:", error);
      return res.status(400).json({ message: error.message });
    }
    return res.json({ message: "Pond updated successfully", affectedRows });
  });
});

// Delete pond by ID
router.delete("/:id", verifyMemberAndShopAndAdminRole, (req, res) => {
  const pondId = req.params.id;
  if (isNaN(pondId) || pondId <= 0) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  
  Pond.deletePondById(pondId, (error, affectedRows) => {
    if (error) {
      console.error("Error deleting pond:", error);
      return res.status(400).json({ message: error.message });
    }
    return res.json({ message: "Pond deleted successfully", affectedRows });
  });
});

// Get all ponds
router.get("/", (req, res) => {
  Pond.getAllPonds((error, ponds) => {
    if (error) {
      console.error("Error fetching ponds:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.json({ ponds });
  });
});

// Get pond details
router.get("/details/:id", (req, res) => {
  const pondId = req.params.id;
  if (isNaN(pondId) || pondId <= 0) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  
  Pond.getPondDetails(pondId, (error, pondDetails) => {
    if (error) {
      console.error("Error fetching pond details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    return pondDetails ? res.json(pondDetails) : res.status(404).json({ message: "Pond not found" });
  });
});

module.exports = router;