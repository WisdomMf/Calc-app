const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001; // Changed port to 5001

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend domain
    methods: ['GET', 'POST'], // Allow only specific methods
    allowedHeaders: ['Content-Type', 'auth-token'] // Allow only specific headers
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});

app.use(express.json());

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).send(token);
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send('Internal server error');
    }
});

// Example of a protected route
app.get('/protected-route', verifyToken, (req, res) => {
    // res.send('This is a protected route');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
