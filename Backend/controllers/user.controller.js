const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model");
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //  console.log(req.body)
   const { fullName, email, password } = req.body;
  const { firstname, lastname } = fullName || {};
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname,
    lastname, // lastName is optional
    email,
    password:hashedPassword
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};
 module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await user.comparePasswword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token, )
  res.status(200).json({ token, user });
}
module.exports.getUserProfile = async (req, res, next) => {
  
    res.status(200).json(  req.user);
 
}
module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  await BlacklistToken.create({ token: req.cookies.token });
  res.status(200).json({ message: "Logged out successfully" });
};