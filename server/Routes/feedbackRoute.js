const express = require('express');
const Feedback = require('./models/Feedback'); // Import your Mongoose model
const router = express.router;

// API endpoint to handle form submission

router.post('/api/feedback', async (req, res) => {
    try {
        const { feedbackType, feedbackText } = req.body;
        const newFeedback = new Feedback({ feedbackType, feedbackText });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
