const db = require('../config/db'); // Import your database connection
const { createTables } = require('./tableController');


const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');



const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the 'user' table exists, if not, create it

        // Check if user already exists
        const [existingUser] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error in signup',
            error
        });
    }
};

// Login Controller (with JWT Token)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const [user] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user[0].user_id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            id: user[0].user_id,
            name: user[0].name,
            email: user[0].email,
           

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error in login',
            error
        });
    }
};
createTables()
module.exports = { signupUser,loginUser }