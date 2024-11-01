const express = require("express");
const router = express.Router();
const WaterParam = require("../models/waterParam");
const { verifyAdminAndShopRole } = require("../middleware/authMiddleware");

// Get water parameters 
router.get("/pond/:id/water-info", (req, res) => {
  const pondId = req.params.id;

  // Input validation
  if (isNaN(pondId) || pondId <= 0) {
    return res.status(400).json({ message: "Invalid pond ID" });
  }

  WaterParam.getWaterParametersByPondId(pondId, (error, waterParams) => {
    if (error) {
      console.error("Error fetching water parameters:", error);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(waterParams);
    }
  });
});

// Create water parameters 
router.post("/pond/:id/water-info", verifyAdminAndShopRole, (req, res) => {
  const pondId = req.params.id;
  const waterInfo = req.body; // Expecting an array of { date, param_name, param_value }

  // Input validation
  if (!waterInfo || !Array.isArray(waterInfo) || waterInfo.length === 0) {
    return res.status(400).json({ message: "Invalid input data. Please provide water parameters." });
  }

  WaterParam.createWaterParametersForPond(pondId, waterInfo, (error, result) => {
    if (error) {
      console.error("Error creating water parameters:", error);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(201).json(result);
    }
  });
});

// Update water parameter by ID 
router.put("/pond/:id/water-info/:waterParamId", verifyAdminAndShopRole, (req, res) => {
  const pondId = req.params.id;
  const waterParamId = req.params.waterParamId;
  const { param_value } = req.body; // Only send the param_value to update

  // Input validation
  if (param_value === undefined) {
    return res.status(400).json({ message: "Invalid input data. Please provide param_value." });
  }

  WaterParam.updateWaterParameterById(waterParamId, pondId, { param_value }, (error, result) => {
    if (error) {
      console.error("Error updating water parameter:", error);
      return res.status(500).json({ message: "Internal server error" });
    } else if (result === 1) {
      res.json({ message: "Water parameter updated" });
    } else {
      res.status(404).json({ message: "Water parameter not found" });
    }
  });
});

// Delete water parameter by ID 
router.delete("/pond/:id/water-info/:waterParamId", verifyAdminAndShopRole, (req, res) => {
  const pondId = req.params.id;
  const waterParamId = req.params.waterParamId;

  WaterParam.deleteWaterParameterById(waterParamId, pondId, (error, result) => {
    if (error) {
      console.error("Error deleting water parameter:", error);
      return res.status(500).json({ message: "Internal server error" });
    } else if (result === 1) {
      res.json({ message: "Water parameter deleted" });
    } else {
      res.status(404).json({ message: "Water parameter not found" });
    }
  });
});

module.exports = router;