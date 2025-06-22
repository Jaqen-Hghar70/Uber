const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const { authCaptain } = require('../middleware/auth.middleware');

router.post(
  '/register',
  [
    body('fullName.firstname')
      .notEmpty().withMessage('First name is required')
      .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

    body('fullName.lastname')
      .optional()
      .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),

    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email')
      .isLength({ min: 5 }).withMessage('Email must be at least 5 characters long'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('phone')
      .notEmpty().withMessage('Phone is required'),

    body('vehicle')
      .notEmpty().withMessage('Vehicle is required'),

    body('vehicleType')
      .notEmpty().withMessage('Vehicle type is required')
      .isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle, or auto'),

    body('capacity')
      .notEmpty().withMessage('Capacity is required')
      .isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),

    body('licenseNumber')
      .notEmpty().withMessage('License number is required'),

    body('location.latitude')
      .notEmpty().withMessage('Latitude is required')
      .isFloat().withMessage('Latitude must be a number'),

    body('location.longitude')
      .notEmpty().withMessage('Longitude is required')
      .isFloat().withMessage('Longitude must be a number')
  ],
  captainController.registerCaptain
);
router.post(
  '/login',
  [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Must be a valid email'),

    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  captainController.loginCaptain
);
router.get(
  '/profile',
  authCaptain,
  captainController.getCaptainProfile
);
router.get(
  '/logout',
  authCaptain,
  captainController.logoutCaptain
);

module.exports = router;