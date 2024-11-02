const express = require("express");
const router = express.Router();
const { verifyAdminRole } = require("../../../middleware/authMiddleware");
const ShopManager = require("../../../models/shopManager");

router.use(verifyAdminRole);

// Create a new shop
router.post("/create", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill in all fields" });
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message:
                    "Invalid email format. Must be a @gmail.com email, and no special characters.",
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }
        if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            return res.status(400).json({
                message: "Password must contain both letters and numbers",
            });
        }

        // Name validation
        if (name.length < 2) {
            return res
                .status(400)
                .json({ message: "Name must be at least 2 characters long" });
        } else if (name.length > 10) {
            return res
                .status(400)
                .json({ message: "Name must be less than 10 characters long" });
        }

        // Stronger validation for name
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            return res
                .status(400)
                .json({ message: "Name can only contain letters and spaces" });
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            });
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res
                .status(400)
                .json({ message: "Invalid data types for input fields" });
        }

        ShopManager.createShopManager(
            { name, email, password },
            (error, results) => {
                if (error) {
                    if (error.code === "ER_DUP_ENTRY") {
                        return res
                            .status(409)
                            .json({ message: "Email already exists" });
                    }
                    return res.status(500).json({ error: error.toString() });
                }
                res.status(201).json({
                    message: "Shop manager created successfully",
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Get all shop
router.get("/getAll", (req, res) => {
    ShopManager.getAllShopManagers((error, results) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No shop managers found" });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
