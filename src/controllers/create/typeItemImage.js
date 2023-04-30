const { createRouter } = require("../../routes/createRouter");
const { validate, uploadImage } = require("../../helpers");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { ReportTypeItemImage } = require("../../models/ReportTypeItemsImages");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { inspectionId, inspectionType, typeId, typeImage, typeItemId } =
    req.body;
  const images = await Promise.all(
    typeImage?.map(async (item) => {
      return await uploadImage({
        image: item,
        directoryPath: "assets/type-item-images/",
        req,
      });
    })
  );

  await ReportTypeItemImage.create({
    inspectionId,
    inspectionType,
    typeId,
    typeItemId,
    typeItemImages: images,
  });
  return res.json(success("Type Item Images uploaded successfully."));
};
createRouter.post(
  "/type-item-image",
  authMiddleware(),
  validate([
    body("inspectionId").isMongoId(),
    body("inspectionType")
      .notEmpty()
      .withMessage("Ispection Type is required."),
    body("typeId").isMongoId(),
    body("typeItemId").isMongoId(),
    body("typeImage")
      .notEmpty()
      .withMessage("Type Images is required")
      .isArray()
      .withMessage("Type Image should be an array"),
  ]),
  wrapRequestHandler(handler)
);
