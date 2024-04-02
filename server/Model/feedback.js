const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Assuming user ID is a string
    feedbackType: {
        type: String,
        enum: ['Bugs', 'Feedback', 'Query'],
        required: true
    },
    feedbackText: { type: String, required: true }
});

module.exports = mongoose.model('Feedback', feedbackSchema);