const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../Model/Product');
dotenv.config();

const productsData = [
  {
    Company: "Sony",
    model: "WH-1000XM4",
    Price: 24990,
    Colour: "Black",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    featureHeading: "Industry-leading noise canceling",
    details: [
      "Industry-leading noise canceling with Dual Noise Sensor technology",
      "Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo",
      "Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback)",
      "Touch controls with speak-to-chat technology",
      "Wearing detection with auto pause/play"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Bose",
    model: "QuietComfort 45",
    Price: 28990,
    Colour: "White",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    featureHeading: "World-class noise cancellation",
    details: [
      "World-class noise cancellation for better focus",
      "TriPort acoustic architecture for deep, full audio",
      "Up to 24 hours of battery life",
      "Quiet and Aware modes for different environments",
      "Built-in microphone for calls and voice assistants"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Apple",
    model: "AirPods Pro",
    Price: 18990,
    Colour: "White",
    HeadphoneType: "In-Ear",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
    featureHeading: "Active noise cancellation",
    details: [
      "Active noise cancellation for immersive sound",
      "Transparency mode to hear the world around you",
      "Spatial audio with dynamic head tracking",
      "Sweat and water resistant (IPX4)",
      "Up to 4.5 hours of listening time with ANC"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Sennheiser",
    model: "HD 660S",
    Price: 32990,
    Colour: "Black",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    featureHeading: "Reference-class sound quality",
    details: [
      "Reference-class sound quality with 150-ohm impedance",
      "Open-back design for natural sound reproduction",
      "Ergonomic design with replaceable ear pads",
      "Detachable cable with 6.3mm stereo plug",
      "Made in Germany with premium materials"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Audio-Technica",
    model: "ATH-M50x",
    Price: 12990,
    Colour: "Black",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    featureHeading: "Studio monitor headphones",
    details: [
      "Studio monitor headphones with exceptional clarity",
      "45mm large-aperture drivers with rare earth magnets",
      "Circumaural design with 90-degree swiveling earcups",
      "Detachable cable with professional-grade connectors",
      "Collapsible design for easy storage and portability"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "JBL",
    model: "Live 660NC",
    Price: 8990,
    Colour: "Blue",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
    featureHeading: "Active noise cancellation",
    details: [
      "Active noise cancellation for immersive listening",
      "40mm dynamic drivers for powerful bass",
      "Up to 30 hours of battery life",
      "Ambient Aware and TalkThru technology",
      "Google Assistant and Amazon Alexa compatible"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Samsung",
    model: "Galaxy Buds2 Pro",
    Price: 15990,
    Colour: "Purple",
    HeadphoneType: "In-Ear",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    featureHeading: "Intelligent active noise cancellation",
    details: [
      "Intelligent active noise cancellation with 3 levels",
      "24-bit Hi-Fi audio with Samsung Seamless Codec",
      "360 Audio with head tracking technology",
      "IPX7 water resistance for workouts",
      "Up to 29 hours total battery life with case"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Beats",
    model: "Studio3 Wireless",
    Price: 21990,
    Colour: "Red",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    featureHeading: "Pure adaptive noise canceling",
    details: [
      "Pure adaptive noise canceling (Pure ANC)",
      "Apple W1 chip for seamless connectivity",
      "Up to 22 hours of battery life",
      "Fast Fuel charging for 3 hours of playback in 10 minutes",
      "Premium comfort with soft over-ear cushions"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Shure",
    model: "SE215",
    Price: 7990,
    Colour: "Clear",
    HeadphoneType: "In-Ear",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
    featureHeading: "Professional sound isolation",
    details: [
      "Professional sound isolation up to 37dB",
      "Dynamic microdriver for enhanced bass response",
      "Detachable cable with MMCX connector",
      "Comfortable and secure fit with memory wire",
      "Includes multiple ear tip sizes for perfect fit"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Beyerdynamic",
    model: "DT 770 Pro",
    Price: 15990,
    Colour: "Black",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    featureHeading: "Studio reference headphones",
    details: [
      "Studio reference headphones with closed design",
      "Dynamic Tesla drivers for detailed sound reproduction",
      "Comfortable velour ear pads for extended listening",
      "Single-sided cable with 3.5mm and 6.3mm adapters",
      "Robust construction for professional studio use"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Marshall",
    model: "Major IV",
    Price: 9990,
    Colour: "Black",
    HeadphoneType: "On-Ear",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
    featureHeading: "Iconic Marshall sound",
    details: [
      "Iconic Marshall sound with custom-tuned 40mm drivers",
      "Up to 80+ hours of wireless playtime",
      "Quick charge feature for 15 hours in 15 minutes",
      "Multi-directional control knob for easy navigation",
      "Premium leatherette and memory foam for comfort"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  },
  {
    Company: "Skullcandy",
    model: "Crusher Evo",
    Price: 12990,
    Colour: "Grey",
    HeadphoneType: "Over-Ear",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
    featureHeading: "Personalized sensory bass",
    details: [
      "Personalized sensory bass with adjustable slider",
      "40-hour battery life with rapid charge",
      "Built-in Tile finding technology",
      "Premium audio drivers with active noise cancellation",
      "Collapsible design with travel case included"
    ],
    reviews: {
      reviews: [],
      totalReviews: 0,
      overallRating: 0
    },
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    ]
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing products (optional)
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(productsData);
    console.log(`✅ Successfully added ${result.length} products to MongoDB Atlas`);
    
    // Show some sample products
    console.log('\n📦 Sample products added:');
    result.slice(0, 3).forEach(product => {
      console.log(`- ${product.Company} ${product.model} (₹${product.Price})`);
    });

    console.log('\n🎉 All products are now stored in MongoDB Atlas!');
    console.log('🌐 Your frontend will now fetch from MongoDB Atlas automatically');

  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the seeding function
seedProducts(); 