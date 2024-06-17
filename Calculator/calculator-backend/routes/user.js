const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, username, password, description } = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
            description
        });

        await newUser.save();
        res.status(201).send('User created');
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(404).send('User not found');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
