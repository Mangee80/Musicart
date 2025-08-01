const express = require('express');
const Cart = require('../Model/cart');
const router = express.Router();

router.get('/user-cart', async (req, res) => {
  try {
    const userID = req.headers['x-user-id']; // Extract user ID from headers
    if (!userID) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Fetch cart items associated with the user ID
    const cart = await Cart.findOne({ user: userID }).populate('items.productId');
    
    // If cart doesn't exist, return empty array
    if (!cart) {
      return res.json([]);
    }
    
    // If cart exists but has no items, return empty array
    if (!cart.items || cart.items.length === 0) {
      return res.json([]);
    }
    
    res.json(cart.items);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.put('/update-cart-item', async (req, res) => {
    try {
      const { userID, productId, newQuantity } = req.body;
      if (!userID || !productId || !newQuantity) {
        return res.status(400).json({ error: 'userID, productId, and newQuantity are required' });
      }
      
      // Find the user's cart
      const cart = await Cart.findOne({ user: userID });
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      console.log("Cart productIds:", cart.items.map(item => item.productId));
      // Update the quantity of the specified product in the cart
      const cartItem = cart.items.find(item => item.productId.toString() === productId);
      if (!cartItem) {
        return res.status(404).json({ error: 'Product not found in the cart' });
      }
      
      cartItem.quantity = newQuantity;
      await cart.save();
  
      res.status(200).json({ message: 'Cart item quantity updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to handle adding a product to the cart
router.post('/add-to-cart', async (req, res) => {
    try {
      const { productId, quantity, userId } = req.body; // Extracting userId from the request body
      
      // Find the user's cart or create a new one if it doesn't exist
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      // Check if the product already exists in the cart
      const existingItem = cart.items.find(item => item.productId.equals(productId));
  
      if (existingItem) {
        // If the product already exists, update its quantity
        existingItem.quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.items.push({ productId, quantity });
      }
  
      // Save the updated cart
      await cart.save();
  
      res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
module.exports = router;
    