const getDashboard = (req, res) => {
    res.json({
        message: 'Welcome to the admin dashboard',
        user: req.user  // Information about the user from the JWT payload
    });
};

module.exports = {
    getDashboard
};
