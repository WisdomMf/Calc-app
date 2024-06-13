const jwt = require('jsonwebtoken');

// Logout route
app.post('/logout', verifyToken, (req, res) => {
    // This could include invalidating the token, removing sessions, etc.
    res.clearCookie('auth-token'); // Clear any cookies set for authentication
    res.send({ message: 'Logged out successfully' });
});


function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verifyToken;
