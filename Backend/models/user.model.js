const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullName: {
    firstname: {
      type: String,
      require: true,
      minlength: [3, "first name must be atleast three character long"],
    },

    lastname: {
      type: String,
      minlength: [3, "last name must be three character long "],
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    minlength: [5, "email must be 5 character long "],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
  return token;
};
userSchema.methods.comparePasswword = async function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
