const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { Inspection } = require("../../models/Inspection");
const { getLoginTokenFromRequest } = require("../../models/UserToken");
const { retrieveRouter } = require("../../routes/retrieveRouter");
const handler = async (req, res) => {
  const { userId } = await getLoginTokenFromRequest(req);
  const inspections = await Inspection.find({ userId }).populate([
    "property",
    "typist",
    "clerk",
    "client",
  ]);
  return res.json(success("", inspections));
};
retrieveRouter.get(
  "/inspections",
  authMiddleware(),
  wrapRequestHandler(handler)
);
