const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adjective: { 
        type: String 
    }
}, { timestamps: true });

const reviewsDataSchema = new Schema({
    reviews: [reviewSchema],
    totalReviews: {
        type: Number,
        default: 0,
        required: true
    },
    overallRating: {
        type: Number,
        default: 0,
        required: true
    }
});

const productSchema = new Schema({
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
    reviews: reviewsDataSchema,
    images: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Product = model('Product', productSchema);

module.exports = Product;
