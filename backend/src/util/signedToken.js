const jwt = require("jsonwebtoken");

module.exports = function getSignedToken(id) {
    return jwt.sign({id:id}, process.env.JWT_KEY, {expiresIn: 90})
};