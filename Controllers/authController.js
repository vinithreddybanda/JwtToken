const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Dummy database for storing users
let users = [];

const registerUser = (req, res) => {
    const { username, password } = req.body;

    // Check if username exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        // Save the new user
        users.push({ username, password: hashedPassword });
        return res.status(201).json({ message: "User registered successfully" });
    });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ message: "User not found!" });
    }

    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Create JWT token
        const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: "Login successful", token });
    });
};

module.exports = { registerUser, loginUser };
