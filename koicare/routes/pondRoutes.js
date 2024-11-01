const express = require("express");
const router = express.Router();
const Pond = require("../models/pond");
const WaterParam = require("../models/waterParam");
const {
    verifyMemberAndShopAndAdminRole,
    verifyAdminAndShopRole,
} = require("../middleware/authMiddleware");

// Get water parameters
router.get("/:id/water-info", verifyMemberAndShopAndAdminRole, (req, res) => {
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
router.post("/:id/water-info", verifyAdminAndShopRole, (req, res) => {
    
    const pondId = req.params.id;
    const waterParamData = req.body;
    const { ph, temt, salinity, o2, no2, no3, po4 } = waterParamData;
    if (!ph || !temt || !salinity || !o2 || !no2 || !no3 || !po4) {
        return res.status(400).json({
            message: "Invalid input data. Please provide water parameters.",
        });
    }
    WaterParam.createWaterParametersForPond(pondId, waterParamData, (error) => {
        if (error) {
            console.error("Error creating water parameters:", error);
            return res.status(500).json({ message: "Internal server error" });
        } else {
            const responseData = new Object();
            for (let waterParamKey in waterParamData) {
                switch (waterParamKey.toLowerCase()) {
                    case "ph":
                        if (
                            waterParamData[waterParamKey] > 9 ||
                            waterParamData[waterParamKey] < 6
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message:
                                    "độ pH không chuẩn, khuyến nghị pH từ 6.5 đến 9",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "độ pH chuẩn",
                            };
                        }
                        break;
                    case "temt":
                        if (
                            waterParamData[waterParamKey] > 30 ||
                            waterParamData[waterParamKey] < 20
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message:
                                    "nhiệt độ khá cao, khuyến nghị từ 25 đến 28 độ C",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "nhiệt độ chuẩn",
                            };
                        }
                        break;
                    case "salinity":
                        if (
                            waterParamData[waterParamKey] > 1 ||
                            waterParamData[waterParamKey] < 0 ||
                            waterParamData[waterParamKey] === 0
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message:
                                    "độ muối khá cao, khuyến nghị từ 0.3% đến 0.7%",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "độ muối chuẩn",
                            };
                        }
                        break;
                    case "o2":
                        if (
                            waterParamData[waterParamKey] > 5 ||
                            waterParamData[waterParamKey] < 5
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message: "mức oxi khá cao, khuyến nghị 5 mg/l",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "mức oxi chuẩn",
                            };
                        }
                        break;
                    case "no2":
                        if (
                            waterParamData[waterParamKey] > 1 ||
                            waterParamData[waterParamKey] < 0
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message:
                                    "mức nitrit khá cao, khuyến nghị 0.2 mg/l",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "mức nitrit chuẩn",
                            };
                        }
                        break;
                    case "no3":
                        if (
                            waterParamData[waterParamKey] > 40 ||
                            waterParamData[waterParamKey] < 0
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message:
                                    "mức nitrat khá cao, khuyến nghị từ 0 - 40 mg/l",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "mức nitrat chuẩn",
                            };
                        }
                        break;
                    case "po4":
                        if (
                            waterParamData[waterParamKey] > 1 ||
                            waterParamData[waterParamKey] < 0
                        ) {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "BAD",
                                message:
                                    "mức phốt phát khá cao, khuyến nghị 0.03 - 0.04 ppm",
                            };
                        } else {
                            responseData[waterParamKey] = {
                                value: waterParamData[waterParamKey],
                                status: "GOOD",
                                message: "mức phốt phát chuẩn",
                            };
                        }
                        break;
                }
            }
            res.status(200).json(responseData);
        }
    });
});

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
        return pond
            ? res.json(pond)
            : res.status(404).json({ message: "Pond not found" });
    });
});

// Create pond
router.post("/", verifyMemberAndShopAndAdminRole, (req, res) => {
  console.log("User ID:", req.userId); // Check user ID

  const { name, image, size, depth, volume, num_of_drains, pump_capacity } = req.body;

  Pond.createPond(
      name,
      image,
      size,
      depth,
      volume,
      num_of_drains,
      pump_capacity,
      req.userId,
      (error, affectedRows) => {
          if (error) {
              console.error("Error creating pond:", error);
              return res.status(400).json({ message: error.message });
          }
          return res.status(201).json({
              message: "Pond created successfully",
              affectedRows,
          });
      }
  );
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
router.get("/:id/details", verifyMemberAndShopAndAdminRole, (req, res) => {
    const pondId = parseInt(req.params.id, 10); 
    if (isNaN(pondId) || pondId <= 0) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    Pond.getPondDetails(pondId, (error, pondDetails) => {
        if (error) {
            console.error("Error fetching pond details:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (pondDetails) {
            return res.json(pondDetails); 
        } else {
            return res.status(404).json({ message: "Pond not found" }); 
        }
    });
});

module.exports = router;
