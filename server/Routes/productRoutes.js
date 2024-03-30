const express = require('express');
const Product = require('../Model/Product');
const router = express.Router();
// Route to handle fetching all products
router.get('/all', async (req, res) => {
    try {
      // Fetch all products
      const allProducts = await Product.find();
  
      // Send all products to the client
      res.json(allProducts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Assuming you're using Express for your backend
router.get('/product/:productId', async (req, res) => {
  try {
      const productId = req.params.productId;
      // Fetch product details by ID
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

});


// Route to handle product filtering
router.post('/filter', async (req, res) => {
  try {
    // Retrieve selected filters from request body
    const filters = req.body;
    
    // Construct query object based on selected filters
    const query = {};
    
    // Add conditions for selected filters
    if (filters.filters.Company && filters.filters.Company !== 'Featured') {
      query.Company = filters.filters.Company;
    }
    if (filters.filters.Colour && filters.filters.Colour !== 'Featured') {
      query.Colour = filters.filters.Colour;
    }
    if (filters.filters.HeadphoneType && filters.filters.HeadphoneType !== 'Featured') {
      query.HeadphoneType = filters.filters.HeadphoneType;
    }
    // Add conditions for price range
    if (filters.filters.Price && filters.filters.Price !== 'Featured') {
      switch (filters.filters.Price) {
        case '₹0 - ₹1,000':
          query.Price = { $gte: 0, $lte: 1000 };
          break;
        case '₹1,000 - ₹10,000':
          query.Price = { $gte: 1000, $lte: 10000 };
          break;
        case '₹10,000 - ₹20,000':
          query.Price = { $gte: 10000, $lte: 20000 };
          break;
        // Add more cases for additional price ranges if needed
        default:
          break;
      }
    }
    // Fetch products based on query
    const filteredProducts = await Product.find(query);

    // Send filtered products to the client
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  


// Route to handle sorting products
router.post('/sort', async (req, res) => {
  try {
    const sortOption = req.body.sortOption;
    let sortedProducts;

    switch (sortOption) {
      case 'Price: Lowest':
        sortedProducts = await Product.find().sort({ Price: 1 });
        break;
      case 'Price: Highest':
        sortedProducts = await Product.find().sort({ Price: -1 });
        break;
      case 'Name: (A-Z)':
        sortedProducts = await Product.find().sort({ model: 1 });
        break;
      case 'Name: (Z-A)':
        sortedProducts = await Product.find().sort({ model: -1 });
        break;
      default:
        sortedProducts = await Product.find();
        break;
    }
    
    res.json(sortedProducts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Route to handle search requests
router.get('/search/:searchQuery', async (req, res) => {
  try {
    const { searchQuery } = req.params;

    // Attempt to convert searchQuery to a number for price comparison
    const priceQuery = Number(searchQuery);

    // Search for products where any of the fields match the search query
    // or the price is equal to the search query if it's a number
    const products = await Product.find({
      $or: [
        { Company: { $regex: searchQuery, $options: 'i' } },
        { model: { $regex: searchQuery, $options: 'i' } },
        { Colour: { $regex: searchQuery, $options: 'i' } },
        { HeadphoneType: { $regex: searchQuery, $options: 'i' } },
        // Include price in the search if searchQuery is a valid number
        ...(isNaN(priceQuery) ? [] : [{ Price: priceQuery }])
      ]
    });
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/addProducts', async (req, res) => {
    try {
      const products = req.body;
  
      // Insert products into the database
      await Product.insertMany(products);
  
      res.status(201).json({ message: 'Products inserted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;