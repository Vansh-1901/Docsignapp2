const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');

// ======= SIGNUP CONTROLLER =========
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

// ======= LOGIN CONTROLLER =========
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMsg = "Invalid email or password";

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ 
                success: false,
                message: errorMsg 
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({ 
                success: false,
                message: errorMsg 
            });
        }

        const jwtToken = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    signup,
    login
};
