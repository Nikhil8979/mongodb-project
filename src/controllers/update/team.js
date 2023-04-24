const { updateRouter } = require("../../routes/updateRouter");
const { validate } = require("../../helpers");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { User } = require("../../models/User");

const handler = async (req, res) => {
  const {
    id,
    name,
    email,
    phone,
    title,
    address,
    pincode,
    city,
    state,
    country,
    role,
  } = req.body;

  await User.findOneAndUpdate({
    _id: id,
    $set: {
      name,
      email,
      phone,
      title,
      address,
      pincode,
      city,
      state,
      country,
      role,
    },
  });

  return res.json(success("Team updated successfully"));
};
updateRouter.post(
  "/team",
  authMiddleware(),
  validate([]),
  wrapRequestHandler(handler)
);
