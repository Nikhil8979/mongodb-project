const { updateRouter } = require("../../routes/updateRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { ReportTypeItemImage } = require("../../models/ReportTypeItemsImages");
const { uploadImage, validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { id, typeImage } = req.body;
  const images = await Promise.all(
    typeImage?.map(async (item) => {
      return await uploadImage({
        image: item,
        directoryPath: "assets/type-item-images/",
        req,
      });
    })
  );
  await ReportTypeItemImage.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        typeItemImages: images,
      },
    }
  );
  return res.json(success("Type Item Image updated Successfully."));
};
updateRouter.post(
  "/type-item-images",
  authMiddleware(),
  validate([body("id").isMongoId()]),
  wrapRequestHandler(handler)
);
