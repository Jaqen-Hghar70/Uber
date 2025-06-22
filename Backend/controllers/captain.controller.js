const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');

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