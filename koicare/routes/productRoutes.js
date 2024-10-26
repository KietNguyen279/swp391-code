const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { verifyShopRole } = require('../middleware/authMiddleware');

// Get all products
router.get('/', (req, res) => {
    Product.getAllProducts((error,
        products) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ error: error.toString() });
        } else {
            res.json(products);
        }
    });
});

// Get product by ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    Product.getProductById(productId, (error, product) => {
        if (error) {
            console.error('Error fetching product:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Create product
router.post('/', verifyShopRole, (req, res) => {
    const { name, image, description, price, quantity } = req.body;

    if (!name || !image || !description || !price || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (price <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
    }
    if (quantity < 0) {
        return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

        Product.createProduct(name, image, description, price, quantity, (error, productId) => {
            if (error) {
                console.error('Error creating product:', error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'A product with this name already exists' });
                } else {
                    return res.status(500).json({ error: error.toString() });
                }
            } else {
                res.status(201).json({ message: 'Product created', productId });
            }
        });
    });


// Update product by ID
router.put('/:id', verifyShopRole, (req, res) => {
    const productId = req.params.id;
    const { name, image, description, price, quantity } = req.body;

    if (!name || !image || !description || !price || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (price <= 0) {
        return res.status(400).json({ message: 'Price must be a positive number' });
    }
    if (quantity < 0) {
        return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    Product.updateProductById(productId, name, image, description, price, quantity, (error, result) => {
        if (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Product updated' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Delete product by ID
router.delete('/:id', verifyShopRole, (req, res) => {
    const productId = req.params.id;
    Product.deleteProductById(productId, (error, result) => {
        if (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: error.toString() });
        } else if (result === 1) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

module.exports = router;