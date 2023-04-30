const { deleteRouter } = require("../../routes/deleteRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { ReportTypeItemImage } = require("../../models/ReportTypeItemsImages");
const { validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { id, image } = req.body;
  await ReportTypeItemImage.updateOne(
    { _id: id },
    {
      $pull: {
        typeItemImages: { $eq: image },
      },
    }
  );
  return res.json(success("Type Item Image Deleted Successfully"));
};
deleteRouter.post(
  "/type-item-image",
  authMiddleware(),
  validate([
    body("id").isMongoId(),
    body("image").notEmpty().withMessage("Image name is required."),
  ]),
  wrapRequestHandler(handler)
);
