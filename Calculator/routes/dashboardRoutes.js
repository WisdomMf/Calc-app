const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

// Admin dashboard route, protected by token verification middleware
router.get('/dashboard', verifyToken, dashboardController.getDashboard);

module.exports = router;
