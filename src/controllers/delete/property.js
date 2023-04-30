const { deleteRouter } = require("../../routes/deleteRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { Property } = require("../../models/Property");
const { body } = require("express-validator");
const { validate } = require("../../helpers");

const handler = async (req, res) => {
  const { id } = req.body;
  await Property.findByIdAndDelete(id);
  return res.json(success("Property Deleted Successfully"));
};
deleteRouter.post(
  "/property",
  authMiddleware(),
  validate([body("id").isMongoId()]),
  wrapRequestHandler(handler)
);
