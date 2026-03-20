const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

const generateToken = async (payload) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload,secret,  { expiresIn: "7d" });
}
module.exports = {
    hashPassword,
    comparePassword,
    generateToken
}