const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { Template } = require("../../models/Template");
const { retrieveRouter } = require("../../routes/retrieveRouter");
const handler = async (req, res) => {
  const templateNames = await Template.find({}).select("name");
  return res.json(success("", { templateNames }));
};
retrieveRouter.get(
  "/template-names",
  authMiddleware(),
  wrapRequestHandler(handler)
);
