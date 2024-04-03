const express = require('express');
const Cart = require('../Model/cart');
const router = express.Router();
const Checkout = require('../Model/checkout')
router.post('/checkout', async (req, res) => {
  try {
      const { userID, deliveryAddress, paymentOption } = req.body;

      if (!userID) {
          return res.status(400).json({ error: 'User ID is required' });
      }

      // Fetch the cart associated with the user ID
      const cart = await Cart.findOne({ user: userID }).populate('items.productId');

      if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
      }

      // Create an array to store products with their quantities
      const products = cart.items.map(item => ({
          product: item.productId,
          quantity: item.quantity
      }));

      // Create a new checkout
      const checkout = new Checkout({
          user: userID,
          products: products,
          deliveryAddress,
          paymentOption
          // Add more fields as needed
      });

      // Save the checkout to the database
      await checkout.save();

      // Delete the cart
      await Cart.findByIdAndDelete(cart._id);

      res.json({ message: 'Checkout created successfully', checkout });
  } catch (error) {
      console.error('Error creating checkout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint to fetch invoice details by ID
router.get('/invoice/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Checkout.findById(invoiceId).populate('products.product');

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  module.exports = router;  