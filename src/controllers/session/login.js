const { body } = require("express-validator");
const { validate, md5, generateToken } = require("../../helpers");
const { wrapRequestHandler, success } = require("../../helpers/response");
const apiRouter = require("../../routes/apiRouter");
const { User } = require("../../models/User");
const { UserToken } = require("../../models/UserToken");

const handler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const encrypt = md5(password);

  if (user.password !== encrypt) throw new Error("Password does not match.");

  const token = await user.generateAuthToken();

  const userToken = new UserToken({
    token,
    userId: user?._id,
    type: "login",
  });
  await userToken.save();
  const data = await UserToken.findOne({ _id: userToken._id }).populate("user");

  return res.json(success("Login successfully.", { data }));
};

apiRouter.post(
  "/login",
  validate([
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .custom(async (email) => {
        if (email) {
          const user = await User.findOne({ email });
          if (!user) throw new Error("User does not exist.");
        }
        return true;
      }),
    body("password").notEmpty().withMessage("Password is required."),
  ]),
  wrapRequestHandler(handler)
);
