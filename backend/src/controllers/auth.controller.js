const User = require("../models/user.model");
const { hashPassword, comparePassword, generateToken } = require("../utils");
const sendResponse = require("../utils/response");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return sendResponse(res, 400, false, "User already exist")
        }

        const hashedPasswod = await hashPassword(password);

        const user = await User.create({ name, email, password: hashedPasswod });

        return sendResponse(res, 201, true, "User created successfully!", { id: user.id, name: user.name, email: user.email })
    } catch (error) {
        console.log(error, "error in register user");

        return sendResponse(res, 500, false, "failed to register user")
    }
}

exports.loginUser = async (req, res) => {
    try {
        console.log("inside", req.body)
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 400, false, "Invalid credentials")
        }


        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return sendResponse(res, 400, false, "Invalid credentials")
        }

        const token = await generateToken({ id: user._id, email: user.email, name: user.name });

        return sendResponse(res, 200, true, "Login successfull", {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })


    } catch (error) {
        console.log(error, "error in login user");
        return sendResponse(res, 500, false, "Failed to login user");
    }
}