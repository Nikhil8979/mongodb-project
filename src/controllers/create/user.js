const { body } = require("express-validator");
const {
  md5,
  validate,
  matchCaseInsensitive,
  validatePasswordStrength,
} = require("../../helpers");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { User } = require("../../models/User");
const { createRouter } = require("../../routes/createRouter");
const handler = async (req, res) => {
  const { name, email, phone, password } = req.body;

  const user = new User({
    name,
    email,
    phone,
    password: md5(password),
  });

  await user.save();
  return res.json(success("User Created Successfully", { user }));
};

createRouter.post(
  "/user",
  validate([
    body("name")
      .notEmpty()
      .bail()
      .withMessage("Name is required.")
      .bail()
      .isString()
      .bail()
      .isLength({ max: 50 })
      .withMessage("Username must be 50 characters long"),
    body("email")
      .notEmpty()
      .bail()
      .withMessage("Email is required.")
      .bail()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .bail()
      .isString()
      .bail()
      .isLength({ max: 50 })
      .withMessage("Email must be 50 characters long")
      .custom(async (email) => {
        if (email) {
          const emailExist = await User.findOne({
            email,
          });

          if (emailExist) throw new Error("Email already exists.");
        }

        return true;
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .custom(async (password) => {
        if (password) {
          validatePasswordStrength(password);
        }
        return true;
      }),
    body("confirm_password")
      .notEmpty()
      .withMessage("Confirm Password is required.")
      .custom(async (confirm_password, { req }) => {
        if (confirm_password) {
          const { password } = req.body;
          if (password !== confirm_password)
            throw new Error("Password does not match.");
        }
        return true;
      }),
  ]),
  wrapRequestHandler(handler)
);
