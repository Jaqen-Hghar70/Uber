const userModel = require('../models/user.model');

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password
}) => {
  if (!firstname || !email || !password) {
    throw new Error('First name, email, and password are required');
  }

  const user = new userModel({
    fullName: {
      firstname,
      lastname,  // lastname is optional
    },
    email,
    password
  });

  try {
    await user.save();
    return user;
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('User creation failed');
  }
};
