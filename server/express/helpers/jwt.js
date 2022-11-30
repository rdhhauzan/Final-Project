const jwt = require("jsonwebtoken");

const createToken = (payload) => jwt.sign(payload, "secret");
const verifyToken = (token) => jwt.verify(token, "secret");

module.exports = { createToken, verifyToken };
