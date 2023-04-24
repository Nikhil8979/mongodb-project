const { retrieveRouter } = require("../../routes/retrieveRouter");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { User } = require("../../models/User");
const { getLoginTokenFromRequest } = require("../../models/UserToken");

const handler = async (req, res) => {
  const { userId } = await getLoginTokenFromRequest(req);
  const { search, role } = req.query;
  const query = User.find({ userId });
  if (search) {
    query.where({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });
  }
  if (role) {
    query.where("role", role);
  }
  const team = await query.exec();
  return res.json(success("", { team }));
};

retrieveRouter.get("/team", authMiddleware(), wrapRequestHandler(handler));
