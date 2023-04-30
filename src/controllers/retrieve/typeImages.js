const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { ReportTypeImage } = require("../../models/ReportTypeImages");
const { retrieveRouter } = require("../../routes/retrieveRouter");
const handler = async (req, res) => {
  const { inspectionId, inspectionType } = req.query;
  const reportTypeImages = await ReportTypeImage.find({
    inspectionId,
    inspectionType,
  });
  return res.json(success("", { reportTypeImages }));
};
retrieveRouter.get(
  "/type-images",
  authMiddleware(),
  wrapRequestHandler(handler)
);
