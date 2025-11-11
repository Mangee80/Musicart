const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');

require('dotenv').config();

// Error Handler middleware
const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
};

router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Check if identifier (email or mobile) and password are provided
        if (!identifier || !password) {
            return res.status(400).json({ error: 'Email/Mobile and Password are required' });
        }

        // Find user by email or mobile
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { mobile: identifier }
            ]
        });

        if (user) {
            const hasPasswordMatched = await bcrypt.compare(password, user.password);
            if (hasPasswordMatched) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                return res.json({
                    status: 'SUCCESS',
                    message: "You've logged in successfully!",
                    token,
                    userID: user._id,
                    MusicCartUsername: user.name,
                    user: identifier // Send either email or mobile in the response
                });
            }
        }

        // If no user found or password doesn't match
        return res.status(401).json({
            status: 'FAILED',
            message: 'Invalid Email/Mobile or Password'
        });

    } catch (error) {
        errorHandler(res, error);
    }
});





router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Check if all required fields are provided
        if (!name || !password || (!email && !mobile)) {
            return res.status(400).json({ error: 'Name, Email/Mobile, and Password are required' });
        }

        // Check if email or mobile is already registered
        const existingUserWithEmail = email ? await User.findOne({ email }) : null;
        const existingUserWithMobile = mobile ? await User.findOne({ mobile }) : null;

        if (existingUserWithEmail || existingUserWithMobile) {
            return res.status(403).json({ error: 'Email/Mobile is Already Registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, mobile, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

        // Determine which identifier to send in the response
        const responseIdentifier = email ? newUser.email : newUser.mobile;

        // Respond with success
        return res.json({
            status: 'SUCCESS',
            message: 'User registered successfully',
            token,
            userID: newUser._id,
            user: responseIdentifier, // Send either email or mobile in the response
            MusicCartUsername: newUser.name
        });
    } catch (error) {
        errorHandler(res, error);
    }
});

module.exports = router;