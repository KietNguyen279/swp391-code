const express = require("express");
const router = express.Router();
const Koi = require("../models/koi");
const { verifyMemberAndShopAndAdminRole } = require("../middleware/authMiddleware");

// Get koi by ID
router.get("/koi/:id", (req, res) => {
  const koiId = req.params.id;

  if (isNaN(koiId) || koiId <= 0) {
    return res.status(400).json({ message: "Invalid Koi ID" });
  }

  Koi.getKoiById(koiId, (error, koi) => {
    if (error) return res.status(400).json({ message: error.message });
    if (!koi) return res.status(404).json({ message: "Koi not found" });
    return res.status(200).json(koi);
  });
});

// Create koi
router.post("/", verifyMemberAndShopAndAdminRole, (req, res) => {
  const {
    name,
    image,
    body_shape,
    age,
    size,
    weight,
    gender,
    breed,
    origin,
    pond_id,
  } = req.body;

  const user_id = req.user.id;

  // Input validation
  if (!name || !image || !body_shape || !gender || !breed || !origin ||
      !isPositiveNumber(age) || !isPositiveNumber(size) || !isPositiveNumber(weight) || 
      !isPositiveNumber(pond_id) || !user_id) {
    return res.status(400).json({ message: "Missing or invalid required fields" });
  }

  Koi.createKoi(
    name,
    image,
    body_shape,
    age,
    size,
    weight,
    gender,
    breed,
    origin,
    pond_id,
    user_id,
    (error, result) => {
      if (error) {
        console.error("Error creating koi:", error);
        return res.status(500).json({ error: error.toString() });
      }
      return res.status(201).json({ message: "Koi created", id: result });
    }
  );
});

// Update koi by ID
router.put("/:id", verifyMemberAndShopAndAdminRole, (req, res) => {
  const koiId = req.params.id;
  const { image, body_shape, age, size, weight, pond_id } = req.body;

  if (isNaN(koiId) || koiId <= 0) {
    return res.status(400).json({ message: "Invalid Koi ID" });
  }

  Koi.updateKoiById(
    koiId,
    image,
    body_shape,
    age,
    size,
    weight,
    pond_id,
    (error, affectedRows) => {
      if (error) {
        return res.status(500).json({ error: error.toString() });
      }
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Koi not found" });
      }
      return res.status(200).json({ message: "Koi updated" });
    }
  );
});

// Delete koi by ID
router.delete("/:id", verifyMemberAndShopAndAdminRole, (req, res) => {
  const koiId = req.params.id;

  if (isNaN(koiId) || koiId <= 0) {
    return res.status(400).json({ message: "Invalid Koi ID" });
  }

  Koi.deleteKoiById(koiId, (error, affectedRows) => {
    if (error) return res.status(500).json({ error: error.toString() });
    if (affectedRows === 0) return res.status(404).json({ message: "Koi not found" });
    return res.status(200).json({ message: "Koi deleted" });
  });
});

// Get all koi
router.get("/", (req, res) => {
  Koi.getAllKoi((error, koiList) => {
    if (error) return res.status(500).json({ error: error.toString() });
    return res.status(200).json(koiList);
  });
});

// Get koi with food by ID
router.get("/food/:id", (req, res) => {
  const koiId = req.params.id;

  if (isNaN(koiId) || koiId <= 0) {
    return res.status(400).json({ message: "Invalid Koi ID" });
  }

  Koi.getKoiWithFoodById(koiId, (error, koi) => {
    if (error) return res.status(500).json({ error: error.toString() });
    if (!koi) return res.status(404).json({ message: "Koi not found" });
    return res.status(200).json(koi);
  });
});

module.exports = router;