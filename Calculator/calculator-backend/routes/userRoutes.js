const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const { verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Route to create a new user
router.post('/add-user', verifyAdmin, async (req, res) => {
    const { fullName, email, username, password, description } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
            description
        });

        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all users
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
