const { retrieveRouter } = require("../../routes/retrieveRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { Property } = require("../../models/Property");
const { getLoginTokenFromRequest } = require("../../models/UserToken");
const handler = async (req, res) => {
  const { search, from_date, to_date } = req.query;
  const { userId } = await getLoginTokenFromRequest(req);

  const query = Property.find({ userId });
  if (search) {
    query.where("address", {
      $regex: search,
      $options: "i",
    });
  }
  if (from_date) {
    query.where("createdAt", {
      $gte: new Date(from_date),
    });
  }
  if (to_date) {
    query.where("createdAt", {
      $lte: new Date(to_date),
    });
  }
  query.sort({ createdAt: -1 });
  const properties = await query.exec();
  return res.json(success("", { properties }));
};
retrieveRouter.get("/property", authMiddleware(), wrapRequestHandler(handler));
