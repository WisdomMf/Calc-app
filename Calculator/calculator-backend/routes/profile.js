const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Ensure the path is correct
const { verifyToken } = require('../middleware/auth');

// Get profile route (protected)
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password'); // Exclude password
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        console.error('Profile fetch error:', err.message);
        res.status(500).send('Internal server error');
    }
});

// Update profile route (protected)
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const { fullName, email, username, description } = req.body;

        // Check for required fields
        if (!fullName) {
            return res.status(400).send('Full Name is required');
        }

        const updateData = {
            ...(fullName && { fullName }),
            ...(email && { email }),
            ...(username && { username }),
            ...(description && { description })
        };

        const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true, runValidators: true }).select('-password');
        if (!user) return res.status(404).send('User not found');

        res.json(user);
    } catch (err) {
        console.error('Profile update error:', err.message);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
