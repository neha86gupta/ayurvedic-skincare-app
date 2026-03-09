const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

// User Registration
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await authService.registerUser(username, password);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await authService.loginUser(username, password);
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

