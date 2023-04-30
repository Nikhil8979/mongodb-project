const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { Report } = require("../../models/Report");
const { getLoginTokenFromRequest } = require("../../models/UserToken");
const { retrieveRouter } = require("../../routes/retrieveRouter");
const handler = async (req, res) => {
  const { inspectionId, inspectionType } = req.body;
  const report = await Report.findOne({ inspectionId, inspectionType });
  return res.json(success("", report));
};
retrieveRouter.get("/report", authMiddleware(), wrapRequestHandler(handler));
