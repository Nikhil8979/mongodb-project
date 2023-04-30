const { createRouter } = require("../../routes/createRouter");
const { validate, uploadImage } = require("../../helpers");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { ReportTypeImage } = require("../../models/ReportTypeImages");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { inspectionId, inspectionType, typeId, typeImage } = req.body;
  const images = await Promise.all(
    typeImage?.map(async (item) => {
      return await uploadImage({
        image: item,
        directoryPath: "assets/type-images/",
        req,
      });
    })
  );

  await ReportTypeImage.create({
    inspectionId,
    inspectionType,
    typeId,
    typeImages: images,
  });
  return res.json(success("Type Image uploaded successfully."));
};
createRouter.post(
  "/type-image",
  authMiddleware(),
  validate([
    body("inspectionId").isMongoId(),
    body("inspectionType")
      .notEmpty()
      .withMessage("Ispection Type is required."),
    body("typeId").isMongoId(),
    body("typeImage")
      .notEmpty()
      .withMessage("Type Images is required")
      .isArray()
      .withMessage("Type Image should be an array"),
  ]),
  wrapRequestHandler(handler)
);
