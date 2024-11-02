const db = require('../config/db');
const bcrypt = require("bcrypt");

const ShopManager = {
    createShopManager: async ({ name, email, password }, callback) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const role = "SHOP";
            const query =
                "INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)";
            const values = [name, email, hashedPassword, role];

            db.query(query, values, (error, results) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, results);
            });
        } catch (error) {
            console.error("Error creating shop manager:", error);
            callback(error, null);
        }
    },

    // Function to get all shop managers
    getAllShopManagers: (callback) => {
        const query = "SELECT * FROM User WHERE role IN (?, ?);";
        const values = ["SHOP", "ADMIN"];

        db.query(query, values, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },
};

module.exports = ShopManager;
