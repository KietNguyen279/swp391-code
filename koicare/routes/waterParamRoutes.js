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
  const waterInfo = req.body;

  // Input validation
  if (!waterInfo || !Array.isArray(waterInfo) || waterInfo.length === 0) {
    return res.status(400).json({
      message: "Invalid input data. Please provide water parameters.",
    });
  }

  const response = {};

  waterInfo.forEach((item) => {
    const { param_name, param_value } = item;

    let status, message;
    switch (param_name.toLowerCase()) {
      case "ph":
        if (param_value > 9) {
          status = "BAD";
          message = "độ pH khá cao, khuyến nghị pH từ 6.5 đến 9";
        } else if (param_value < 6) {
          status = "BAD";
          message = "độ pH khá thấp, khuyến nghị pH từ 6.5 đến 9";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      case "temperature":
        if (param_value > 30) {
          status = "BAD";
          message = "nhiệt độ khá cao, khuyến nghị từ 25 đến 28 độ C";
        } else if (param_value < 20) {
          status = "BAD";
          message = "nhiệt độ khá thấp, khuyến nghị từ 25 đến 28 độ C";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      case "salinity":
        if (param_value > 1) {
          status = "BAD";
          message = "độ muối khá cao, khuyến nghị từ 0.3% đến 0.7%";
        } else if (param_value < 0 || param_value === 0) {
          status = "BAD";
          message = "độ muối khá thấp, khuyến nghị từ 0.3% đến 0.7%";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      case "o2":
        if (param_value > 5) {
          status = "BAD";
          message = "mức oxi khá cao, khuyến nghị 5 mg/l";
        } else if (param_value < 5) {
          status = "BAD";
          message = "mức oxi khá thấp, khuyến nghị 5 mg/l";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      case "no2":
        if (param_value > 1) {
          status = "BAD";
          message = "mức nitrit khá cao, khuyến nghị 0.2 mg/l";
        } else if (param_value < 0) {
          status = "BAD";
          message = "mức nitrit khá thấp, khuyến nghị 0.2 mg/l";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      case "no3":
        if (param_value > 40) {
          status = "BAD";
          message = "mức nitrat khá cao, khuyến nghị từ 0 - 40 mg/l";
        } else if (param_value < 0) {
          status = "BAD";
          message = "mức nitrat khá thấp, khuyến nghị từ 0 - 40 mg/l";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      case "po4":
        if (param_value > 1) {
          status = "BAD";
          message = "mức phốt phát khá cao, khuyến nghị 0.03 - 0.04 ppm";
        } else if (param_value < 0) {
          status = "BAD";
          message = "mức phốt phát khá thấp, khuyến nghị 0.03 - 0.04 ppm";
        } else {
          status = "GOOD";
          message = null;
        }
        break;

      default:
        status = "UNKNOWN";
        message = "Unknown parameter";
    }

    response[param_name] = {
      status: status,
      message: message,
    };
  });

  WaterParam.createWaterParametersForPond(
    pondId,
    waterInfo,
    (error, result) => {
      if (error) {
        console.error("Error creating water parameters:", error);
        return res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(201).json(response);
      }
    }
  );
});

// Update water parameter by ID
router.put(
  "/pond/:id/water-info/:waterParamId",
  verifyAdminAndShopRole,
  (req, res) => {
    const pondId = req.params.id;
    const waterParamId = req.params.waterParamId;
    const { param_value } = req.body; 

    // Input validation
    if (param_value === undefined) {
      return res
        .status(400)
        .json({ message: "Invalid input data. Please provide param_value." });
    }

    WaterParam.updateWaterParameterById(
      waterParamId,
      pondId,
      { param_value },
      (error, result) => {
        if (error) {
          console.error("Error updating water parameter:", error);
          return res.status(500).json({ message: "Internal server error" });
        } else if (result === 1) {
          res.json({ message: "Water parameter updated" });
        } else {
          res.status(404).json({ message: "Water parameter not found" });
        }
      }
    );
  }
);

// Delete water parameter by ID 
router.delete(
  "/pond/:id/water-info/:waterParamId",
  verifyAdminAndShopRole,
  (req, res) => {
    const pondId = req.params.id;
    const waterParamId = req.params.waterParamId;

    WaterParam.deleteWaterParameterById(
      waterParamId,
      pondId,
      (error, result) => {
        if (error) {
          console.error("Error deleting water parameter:", error);
          return res.status(500).json({ message: "Internal server error" });
        } else if (result === 1) {
          res.json({ message: "Water parameter deleted" });
        } else {
          res.status(404).json({ message: "Water parameter not found" });
        }
      }
    );
  }
);

module.exports = router;
