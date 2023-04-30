const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { Report } = require("../../models/Report");
const { updateRouter } = require("../../routes/updateRouter");
const { validate } = require("../../helpers");
const { body } = require("express-validator");
const handler = async (req, res) => {
  const { id, categoryId, typeItemId, updatedValue } = req.body;
  await Report.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        "report.$[report].typeItems.$[typeItem].value": updatedValue,
      },
    },
    {
      arrayFilters: [
        { "report._id": categoryId },
        { "typeItem._id": typeItemId },
      ],
    }
  );
  return res.json(success("Report updated successfully"));
};

updateRouter.post(
  "/report",
  authMiddleware(),
  validate([
    body("id").isMongoId(),
    body("categoryId").isMongoId(),
    body("typeItemId").isMongoId(),
    body("updatedValue")
      .notEmpty()
      .withMessage("Please provide value to be updated."),
  ]),

  wrapRequestHandler(handler)
);
