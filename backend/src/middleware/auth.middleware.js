const sendResponse = require("../utils/response");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token;

        const authHeader = req.headers.authorization;
        console.log(authHeader, "here is header");
        

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1].replace(/"/g, "");
        }
        console.log(token);
        

        if (!token) {
            console.log("here from here");
            
            return sendResponse(res, 401, false, "Not authorized")
        }
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return sendResponse(res, 401, false, "Not authorized, invalid token")
    }
}

module.exports = authMiddleware;