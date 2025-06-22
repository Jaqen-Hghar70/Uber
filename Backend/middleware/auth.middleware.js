const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.authUser = async (req, res, next) => {
  // Try to get token from Authorization header or cookie
  let token = req.header("Authorization");
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  const isBalcklisted = await BlacklistToken.findOne({ token });
  if (isBalcklisted) {
    return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
};