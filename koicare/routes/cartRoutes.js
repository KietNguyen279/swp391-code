const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const { verifyToken } = require('../middleware/authMiddleware');

// Get cart by user ID
router.get('/', verifyToken, (req, res) => {
  const userId = req.userId;

  Cart.getCartByUserId(userId, (error, cart) => {
    if (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ error: error.toString() });
    }
    res.json(cart);
  });
});

// Add item to cart
router.post('/', verifyToken, (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  Product.getProductById(productId, (productError, product) => {
    if (productError) {
      console.error('Error fetching product:', productError);
      return res.status(500).json({ error: productError.toString() });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Cart.addItemToCart(userId, productId, quantity, (error, result) => {
      if (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: error.toString() });
      }
      res.status(201).json({ message: 'Item added to cart' });
    });
  });
});

// Update item quantity in cart
router.put('/:productId', verifyToken, (req, res) => {
  const userId = req.userId;
  const productId = req.params.productId;
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  Cart.updateCartItemQuantity(userId, productId, quantity, (error, result) => {
    if (error) {
      console.error('Error updating cart item quantity:', error);
      return res.status(500).json({ error: error.toString() });
    }
    if (result === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Cart item quantity updated' });
  });
});

// Remove item from cart
router.delete('/:productId', verifyToken, (req, res) => {
  const userId = req.userId;
  const productId = req.params.productId;

  Cart.removeItemFromCart(userId, productId, (error, result) => {
    if (error) {
      console.error('Error removing item from cart:', error);
      return res.status(500).json({ error: error.toString() });
    }
    if (result === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  });
});

module.exports = router;