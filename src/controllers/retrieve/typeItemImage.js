const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { ReportTypeItemImage } = require("../../models/ReportTypeItemsImages");
const { retrieveRouter } = require("../../routes/retrieveRouter");
const { validate } = require("../../helpers");
const { query } = require("express-validator");
const handler = async (req, res) => {
  const { inspectionId, inspectionType } = req.query;
  const reportTypeItemImages = await ReportTypeItemImage.find({
    inspectionId,
    inspectionType,
  });

  return res.json(success("", { reportTypeItemImages }));
};
retrieveRouter.get(
  "/type-item-images",
  authMiddleware(),
  validate([
    query("inspectionId").isMongoId(),
    query("inspectionType")
      .notEmpty()
      .withMessage("Inspection Type is required"),
  ]),
  wrapRequestHandler(handler)
);
