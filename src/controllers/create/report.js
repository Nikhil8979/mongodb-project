const { createRouter } = require("../../routes/createRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { Report } = require("../../models/Report");
const { validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { templateId, inspectionId, inspectionType, report } = req.body;

  await Report.create({
    templateId,
    inspectionId,
    inspectionType,
    report,
  });
  return res.json(success("Report saved successfully"));
};

createRouter.post(
  "/report",
  authMiddleware(),
  validate([
    body("templateId").notEmpty().withMessage("Template Id is required."),
    body("inspectionId").notEmpty().withMessage("Inspection Id is required."),
    body("inspectionType")
      .notEmpty()
      .withMessage("Inspection Type is required."),
    body("report").notEmpty().withMessage("Report is required."),
  ]),
  wrapRequestHandler(handler)
);
