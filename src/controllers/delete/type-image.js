const { deleteRouter } = require("../../routes/deleteRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { ReportTypeImage } = require("../../models/ReportTypeImages");
const { validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { id, image } = req.body;
  await ReportTypeImage.updateOne(
    { _id: id },
    {
      $pull: {
        typeImages: { $eq: image },
      },
    }
  );
  return res.json(success("Type Image Deleted Successfully"));
};
deleteRouter.post(
  "/type-image",
  authMiddleware(),
  validate([body("id").isMongoId()]),
  wrapRequestHandler(handler)
);
