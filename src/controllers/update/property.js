const { body } = require("express-validator");
const { validate } = require("../../helpers");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { Property } = require("../../models/Property");
const { updateRouter } = require("../../routes/updateRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");

const handler = async (req, res) => {
  const {
    id,
    address,
    city,
    pincode,
    state,
    country,
    reference,
    type,
    furnishingType,
    comment,
  } = req.body;

  await Property.findOneAndUpdate({
    _id: id,
    $set: {
      address,
      city,
      pincode,
      state,
      country,
      reference,
      type,
      furnishingType,
      comment,
    },
  });
  return res.json(success("Property Updated Successfully"));
};

updateRouter.post(
  "/property",
  authMiddleware(),
  validate([
    body("id").notEmpty().isMongoId(),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("pincode").notEmpty().withMessage("Pincode is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("type").notEmpty().withMessage("Type is required"),
  ]),
  wrapRequestHandler(handler)
);
