const userModel = require('../models/user.model');

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password
}) => {
  // if (!firstName || !email || !password) {
  //   throw new Error('First name, email, and password are required');
  // }

  // Hash the password
  // const hashedPassword = await userModel.hashPassword(password);

  // Create the user object
  const user = new userModel({
    fullName: {
      firstname,
      lastname,  // lastname is optional
    },
    email,
    password
  });

  // Save the user
    
      return user;
};
