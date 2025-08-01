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
router.get('/product/:id', async (req, res) => {
  try {
      const productId = req.params.id;
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
        case '₹0 - ₹10,000':
          query.Price = { $gte: 0, $lte: 10000 };
          break;
        case '₹10,000 - ₹20,000':
          query.Price = { $gte: 10000, $lte: 20000 };
          break;
        case '₹20,000 - ₹35,000':
          query.Price = { $gte: 20000, $lte: 35000 };
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

// Define adjectives based on ratings
const adjectivesByRating = {
  1: ["poor", "bad", "terrible"],
  2: ["below average", "mediocre", "not good"],
  3: ["average", "fair", "moderate"],
  4: ["good", "great", "very good"],
  5: ["excellent", "outstanding", "fabulous"]
};

// Route to add a review to a product
router.post('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { rating, comment, userId } = req.body;

  try {
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).send({ message: 'Product not found' });
      }

      // Choose an adjective based on the rating
      const adjectives = adjectivesByRating[rating];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

      // Add the new review
      const newReview = {
          rating,
          comment,
          user: userId,
          adjective // Adding the adjective to the review
      };

      product.reviews.reviews.push(newReview);
      product.reviews.totalReviews = product.reviews.reviews.length;
      product.reviews.overallRating = product.reviews.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.reviews.length;

      await product.save();
      res.status(201).send({ message: 'Review added', product: product });
  } catch (err) {
      console.error('Error adding review:', err);
      res.status(500).send({ message: 'Error adding review' });
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

// TEMPORARY: Seed demo products endpoint (remove after testing)
router.post('/seed-products', async (req, res) => {
  try {
    const demoProducts = [
      {
        Company: "Sony",
        model: "WH-1000XM5",
        Price: 29999,
        Colour: "Black",
        HeadphoneType: "Over-ear headphone",
        imageUrl: "https://m.media-amazon.com/images/I/61vph3i6bKL._SL1500_.jpg",
        featureHeading: "Industry-leading Noise Cancellation",
        details: [
          "Up to 30 hours battery life",
          "Touch controls",
          "Adaptive Sound Control",
          "Quick charge (10 min = 5 hours)"
        ],
        reviews: { reviews: [], totalReviews: 0, overallRating: 0 },
        images: [
          "https://m.media-amazon.com/images/I/61vph3i6bKL._SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61vph3i6bKL._AC_SL1000_.jpg"
        ]
      },
      {
        Company: "JBL",
        model: "Tune 230NC",
        Price: 5499,
        Colour: "Blue",
        HeadphoneType: "In-ear headphone",
        imageUrl: "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SL1500_.jpg",
        featureHeading: "Pure Bass, Active Noise Cancelling",
        details: [
          "40 hours playtime",
          "IPX4 water resistant",
          "4 mics for perfect calls",
          "Fast Pair with Google"
        ],
        reviews: { reviews: [], totalReviews: 0, overallRating: 0 },
        images: [
          "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61+Q6Rh3OQL._AC_SL1000_.jpg"
        ]
      },
      {
        Company: "Marshall",
        model: "Major IV",
        Price: 12999,
        Colour: "Brown",
        HeadphoneType: "On-ear headphone",
        imageUrl: "https://m.media-amazon.com/images/I/71l5U5Z3pEL._SL1500_.jpg",
        featureHeading: "Iconic Sound, 80+ Hours Playtime",
        details: [
          "Wireless charging",
          "Foldable design",
          "Multi-directional control knob",
          "Classic Marshall look"
        ],
        reviews: { reviews: [], totalReviews: 0, overallRating: 0 },
        images: [
          "https://m.media-amazon.com/images/I/71l5U5Z3pEL._SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71l5U5Z3pEL._AC_SL1000_.jpg"
        ]
      },
      {
        Company: "Boat",
        model: "Rockerz 450 Pro",
        Price: 1999,
        Colour: "White",
        HeadphoneType: "Over-ear headphone",
        imageUrl: "https://m.media-amazon.com/images/I/61u48FEsQKL._SL1500_.jpg",
        featureHeading: "70 Hours Playback, ASAP Charge",
        details: [
          "Dual connectivity (Bluetooth + AUX)",
          "40mm drivers",
          "Lightweight design",
          "Voice assistant support"
        ],
        reviews: { reviews: [], totalReviews: 0, overallRating: 0 },
        images: [
          "https://m.media-amazon.com/images/I/61u48FEsQKL._SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61u48FEsQKL._AC_SL1000_.jpg"
        ]
      },
      {
        Company: "Ptron",
        model: "Bassbuds Duo",
        Price: 899,
        Colour: "Black",
        HeadphoneType: "In-ear headphone",
        imageUrl: "https://m.media-amazon.com/images/I/61l7L4dCwUL._SL1500_.jpg",
        featureHeading: "True Wireless, Deep Bass",
        details: [
          "32 hours playtime",
          "Touch controls",
          "Voice assistant",
          "Lightweight & ergonomic"
        ],
        reviews: { reviews: [], totalReviews: 0, overallRating: 0 },
        images: [
          "https://m.media-amazon.com/images/I/61l7L4dCwUL._SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61l7L4dCwUL._AC_SL1000_.jpg"
        ]
      }
    ];
    await Product.insertMany(demoProducts);
    res.json({ message: 'Demo products seeded successfully!' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed demo products.' });
  }
});
  
module.exports = router;