const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Company: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Colour: {
        type: String,
        required: true
    },
    HeadphoneType: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    featureHeading: {
        type: String,
        required: true
    },
    details: {
        type: [String],
        required: true
    },
    reviews: {
        totalReviews: {
            type: Number,
            required: true
        },
        overallRating: {
            type: Number,
            required: true
        }
    },
    images: {
        type: [String],
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
