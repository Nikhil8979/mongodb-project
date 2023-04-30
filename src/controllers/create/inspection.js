const { body } = require("express-validator");
const { validate } = require("../../helpers");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { createRouter } = require("../../routes/createRouter");
const { Inspection } = require("../../models/Inspection");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { getLoginTokenFromRequest } = require("../../models/UserToken");

const handler = async (req, res) => {
  const { userId } = await getLoginTokenFromRequest(req);
  const {
    propertyId,
    templateId,
    reportType,
    typistId,
    locationOfKeys,
    turnAround,
    internalNotes,
  } = req.body;

  const inspection = new Inspection({
    propertyId,
    templateId,
    reportType,
    typistId,
    locationOfKeys,
    turnAround,
    internalNotes,
    userId,
  });
  await inspection.save();
  return res.json(success("Inspection Created Successfully"));
};

createRouter.post(
  "/inspection",
  authMiddleware(),
  validate([
    body("reportType").notEmpty().withMessage("Report Type is required"),
    body("propertyId").notEmpty().withMessage("Please select the property"),
    body("templateId").notEmpty().withMessage("Please select the template."),
  ]),
  wrapRequestHandler(handler)
);
