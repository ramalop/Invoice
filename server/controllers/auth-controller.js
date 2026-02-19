const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "email already exists try logging in"
            })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPass })
        await user.save()
        res.status(201).json({
            success: true,
            message: "Registered successfully"
        })

    } catch (error) {
        console.error("REGISTER ERROR:", error)
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        })
    }
}

 const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.json({
                success: false,
                message: "No user found with this email",
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET || "agh567",
            { expiresIn: "1d" }
        );

        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
            })
            .json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });

    } catch (error) {
        console.error(error);
        
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};
 const logoutUser = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    })
}


 const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({
        success: false,
        message: "User unauthorised"
    })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "agh567")
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        
        res.status(401).json({
            success: false,
            message: "User unauthorised"
        })
    }
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};