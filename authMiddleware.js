const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Store user data in request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = isAuthenticated;
