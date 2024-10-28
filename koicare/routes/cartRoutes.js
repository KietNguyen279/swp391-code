const express = require('express');
const router = express.Router();
const Cart = require('../models/cart')
const Product = require('../models/product');
const { verifyMemberAndShopRole } = require('../middleware/authMiddleware'); 

// Get cart by user ID
router.get('/', (req, res) => {
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
router.post('/', verifyMemberAndShopRole, (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  return Product.getProductById(productId, (productError, product) => {
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
        if (error.code === 'ER_DUP_ENTRY') { 
          return res.status(409).json({ message: 'Item already exists in the cart' });
        } else if (error.code === 'ER_NO_REFERENCED_ROW_2') { 
          return res.status(400).json({ message: 'Invalid product ID or cart ID' });
        } else {
          return res.status(500).json({ error: error.toString() });
        }
      }
      return res.status(201).json({message: 'Add item to cart successfully'})
    })
  });
});

// Update item quantity in cart
router.put('/:productId', verifyMemberAndShopRole, (req, res) => {
  const userId = req.userId;
  const productId = req.params.productId;
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number!' }); 
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
router.delete('/:productId', verifyMemberAndShopRole, (req, res) => {
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