const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const verifyToken = require('./middleware/auth').verifyToken;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Adjust according to your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'auth-token']
}));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Database');
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
});

app.use(express.json());

const User = require('./models/users'); // Ensure this path is correct

// Register route
app.post('/register', async (req, res) => {
    const { fullName, email, username, password, description, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, username, password: hashedPassword, description, role });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).send(token);
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send('Internal server error');
    }
});

// Logout route
app.post('/logout', verifyToken, (req, res) => {
    res.clearCookie('auth-token');
    res.send({ message: 'Logged out successfully' });
});

// Profile routes
const profileRoutes = require('./routes/profile');
app.use('/api', profileRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
