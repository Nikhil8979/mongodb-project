const { createRouter } = require("../../routes/createRouter");
const { validate } = require("../../helpers");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { Property } = require("../../models/Property");
const { body } = require("express-validator");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { getLoginTokenFromRequest } = require("../../models/UserToken");
const handler = async (req, res) => {
  const { userId } = await getLoginTokenFromRequest(req);
  const {
    address,
    city,
    state,
    pincode,
    country,
    reference,
    type,
    furnishingType,
    comment,
  } = req.body;

  const property = new Property({
    address,
    city,
    state,
    pincode,
    country,
    reference,
    type,
    userId,
    furnishingType,
    comment,
  });
  await property.save();
  return res.json(success("Property Created Successfully"));
};

createRouter.post(
  "/property",
  authMiddleware(),
  validate([
    body("address").notEmpty().withMessage("Address is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("pincode").notEmpty().withMessage("Pincode is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("type").notEmpty().withMessage("Address is required"),
  ]),
  wrapRequestHandler(handler)
);
