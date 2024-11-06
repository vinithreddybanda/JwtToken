const express = require('express');
const { registerUser, loginUser } = require('../Controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
const verifyToken = require('../Middleware/authMiddleware');

// A protected route that requires JWT authentication
router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: "Access granted", user: req.user });
});


module.exports = router;
