const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, password, phone, vehicle, vehicleType, capacity, licenseNumber, location } = req.body;
  const isCaptainExists = await captainModel.find({ email });
    if (isCaptainExists.length > 0) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }
    // Hash password using captainModel's hashPassword method
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      fullName,
      email,
      password: hashedPassword,
      phone,
      vehicle,
      vehicleType,
      capacity,
      licenseNumber,
      location
    });

    // Generate auth token from captain model instance
    const token = captain.generateAuthToken();

    res.status(201).json({ message: 'Captain registered successfully', token, captain });
  } catch (error) {
    console.error('Error registering captain:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate auth token from captain model instance
    const token = captain.generateAuthToken();
    res.cookie('token', token)

    res.status(200).json({ message: 'Login successful', token, captain });
  } catch (error) {
    console.error('Error logging in captain:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    // req.captain is set by authCaptain middleware
    res.status(200).json(req.captain);
  } catch (error) {
    console.error('Error fetching captain profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports.logoutCaptain = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookie
    let token = req.header('Authorization');
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
     if (token) {
      await BlacklistToken.create({ token });
    }
    res.clearCookie('token');
   
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out captain:', error);
    res.status(500).json({ message: 'Server error' });
  }
};