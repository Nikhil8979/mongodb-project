const { updateRouter } = require("../../routes/updateRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { User } = require("../../models/User");
const { uploadImage, validate } = require("../../helpers");
const { body } = require("express-validator");

const handler = async (req, res, next) => {
  const {
    id,
    name,
    email,
    phone,
    profile_image,
    address,
    pincode,
    city,
    state,
    country,
  } = req.body;

  const profileImage = await uploadImage({
    image: profile_image,
    directoryPath: "assets/user-images/",
    req,
  });
  await User.findOneAndUpdate({
    _id: id,
    $set: {
      name,
      email,
      phone,
      address,
      pincode,
      city,
      state,
      country,
      profileImage,
      isProfileCompleted: true,
    },
  });

  return res.json(success("User Updated Successfully"));
};

updateRouter.post(
  "/user",
  validate([
    body("id").notEmpty().isMongoId(),
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
      .custom(async (email, { req }) => {
        const { id } = req.body;
        if (email) {
          const emailExist = await User.findOne({
            $and: [
              {
                email,
              },
              {
                _id: { $ne: id },
              },
            ],
          });
          if (emailExist) throw new Error("Email already exists.");
        }

        return true;
      }),
    body("address").notEmpty().withMessage("Address is required."),
    // body("pincode").notEmpty().withMessage("Pincode is required."),
    body("city").notEmpty().withMessage("City is required."),
    body("state").notEmpty().withMessage("State is required."),
    body("country").notEmpty().withMessage("Country is required."),
    body("profile_image").notEmpty().withMessage("Profile Image is required."),
  ]),
  wrapRequestHandler(handler)
);
