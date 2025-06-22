const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
  fullName,
  email,
  password,
  phone,
  vehicle,
  vehicleType,
  capacity,
  licenseNumber,
  location
}) => {
  if (
    !fullName ||
    !fullName.firstname ||
    !email ||
    !password ||
    !phone ||
    !vehicle ||
    !vehicleType ||
    !capacity ||
    !licenseNumber ||
    !location ||
    typeof location.latitude === 'undefined' ||
    typeof location.longitude === 'undefined'
  ) {
    throw new Error('All required fields must be provided');
  }

  const captain = new captainModel({
    fullName: {
      firstname: fullName.firstname,
      lastname: fullName.lastname || ''
    },
    email,
    password,
    phone,
    vehicle,
    vehicleType,
    capacity,
    licenseNumber,
    location
  });

  await captain.save();
  return captain;
};