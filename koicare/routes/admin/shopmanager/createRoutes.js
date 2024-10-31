const express = require("express");
const router = express.Router();
const db = require("../../../config/db");
const { verifyAdminRole } = require("../../../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const User = require("../../../models/user");

router.use(verifyAdminRole);

router.post("/shopmanager/create", async  (req, res) => {
    try {
        const { name, email, password } = req.body; 
  
      // Input validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
      }
  
      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({
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
        return res
          .status(400)
          .json({ message: "Password must contain both letters and numbers" });
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
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = "SHOP";
      
      User.createUser(
        { name, email, password: hashedPassword, role },
        (error, results) => {
          if (error) {
            console.error("Error registering user:", error);
            if (error.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ message: "Email already exists" });
            } else {
              return res.status(500).json({ error: error.toString() });
            }
          } else {
            return res.status(201).json({ message: "User registered" });
          }
        }
      );
    } catch (error) {
      console.error("Error in registration:", error);
      return res.status(500).json({ error: error.toString() });
    }
  });


module.exports = router;