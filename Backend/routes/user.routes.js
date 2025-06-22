const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("fullName.firstname")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("fullName.lastname")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email")
      .isLength({ min: 5 })
      .withMessage("Email must be at least 5 characters long"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage ("Email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);
router.get(
  "/profile",AuthMiddleware.authUser,userController.getUserProfile
);
router.get(
  "/logout",AuthMiddleware.authUser,userController.logoutUser
);


module.exports = router;
