const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
  fullName: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"]
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"]
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['car', 'motorcycle', 'auto'],
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  socketId: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  }
});

// Generate JWT token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

// Compare password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash password
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Captain', captainSchema);
