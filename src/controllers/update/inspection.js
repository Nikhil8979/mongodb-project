const { updateRouter } = require("../../routes/updateRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { validate } = require("../../helpers/index");
const { Inspection } = require("../../models/Inspection");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const {
    id,
    reportType,
    templateId,
    typistId,
    locationOfKeys,
    turnAround,
    internalNotes,
    conductDate,
    time,
    clerkId,
    clientId,
  } = req.body;

  await Inspection.findOneAndUpdate({
    _id: id,
    $set: {
      reportType,
      templateId,
      typistId,
      locationOfKeys,
      turnAround,
      internalNotes,
      conductDate,
      time,
      clerkId,
      clientId,
    },
  });

  return res.json(success("Inspection Updated Successfully"));
};

updateRouter.post(
  "/inspection",
  authMiddleware(),
  validate([
    body("id").isMongoId(),
    body("templateId").notEmpty().withMessage("Please select the template."),
    body("locationOfKeys")
      .notEmpty()
      .withMessage("Location of keys is required."),
    body("internalNotes")
      .notEmpty()
      .withMessage("Internal of notes is required."),
    body("conductDate")
      .notEmpty()
      .withMessage("Please select the conduct date."),
    body("time").notEmpty().withMessage("Please select the time."),
  ]),
  wrapRequestHandler(handler)
);
