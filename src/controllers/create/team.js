const { createRouter } = require("../../routes/createRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { validate, md5 } = require("../../helpers");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { body } = require("express-validator");
const { User } = require("../../models/User");
const { getLoginTokenFromRequest } = require("../../models/UserToken");
const handler = async (req, res) => {
  const {
    name,
    email,
    phone,
    title,
    password,
    address,
    pincode,
    city,
    state,
    country,
    role,
  } = req.body;
  const { userId } = await getLoginTokenFromRequest(req);

  const encrypt = md5(password);
  const team = new User({
    name,
    email,
    phone,
    title,
    password: encrypt,
    userId,
    address,
    pincode,
    city,
    state,
    country,
    role,
  });
  await team.save();
  return res.json(success("Team Created Successfully"));
};

createRouter.post(
  "/team",
  authMiddleware(),
  validate([
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ max: 50 })
      .withMessage("Name must be 50 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (email) => {
        if (email) {
          const emailExist = await User.findOne({ email });
          if (emailExist) throw new Error("Email already exists.");
        }
        return true;
      }),
    body("title").notEmpty().withMessage("Title is required"),
    body("role").notEmpty().withMessage("Role is required."),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .custom(async (password, { req }) => {
        const { confirm_password } = req.body;
        if (password) {
          if (password !== confirm_password) {
            throw new Error("Password does not match.");
          }
        }
        return true;
      }),
  ]),
  wrapRequestHandler(handler)
);
