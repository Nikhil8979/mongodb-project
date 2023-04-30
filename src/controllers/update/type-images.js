const { updateRouter } = require("../../routes/updateRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { ReportTypeImage } = require("../../models/ReportTypeImages");
const { uploadImage, validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { id, typeImage } = req.body;
  const images = await Promise.all(
    typeImage?.map(async (item) => {
      return await uploadImage({
        image: item,
        directoryPath: "assets/type-images/",
        req,
      });
    })
  );
  await ReportTypeImage.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        typeImages: images,
      },
    }
  );
  return res.json(success("Type Image updated Successfully."));
};
updateRouter.post(
  "/type-images",
  authMiddleware(),
  validate([body("id").isMongoId()]),
  wrapRequestHandler(handler)
);
