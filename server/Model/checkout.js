const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ],
    deliveryAddress: {
        type: String,
        required: true
    },
    paymentOption: {
        type: String,
        required: true
    }
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
