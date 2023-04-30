const { deleteRouter } = require("../../routes/deleteRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { Inspection } = require("../../models/Inspection");
const { validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { id } = req.body;
  await Inspection.findByIdAndDelete(id);
  return res.json(success("Inspection Deleted Successfully"));
};
deleteRouter.post(
  "/inspection",
  authMiddleware(),
  validate([body("id").isMongoId()]),
  wrapRequestHandler(handler)
);
