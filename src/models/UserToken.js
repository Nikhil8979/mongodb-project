const mongoose = require("mongoose");
const { verify } = require("jsonwebtoken");
const UserTokenSchema = new mongoose.Schema(
  {
    userId: mongoose.Types.ObjectId,
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

UserTokenSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});
const UserToken = mongoose.model("UserToken", UserTokenSchema);
const getLoginTokenFromRequest = async (req) => {
  let { login_token } = req;
  if (!login_token) {
    const auth = (req.headers.authorization || "").replace("Bearer ", "");
    const errorMessage = "Invalid Token or Token Expired";
    let verified;

    try {
      verified = verify(auth, "secretkey");
    } catch (e) {
      res.status(401);
      return res.json(error(errorMessage));
    }

    if (!verified) {
      res.status(401);
      return res.json(error(errorMessage));
    }

    login_token = await UserToken.findOne({
      id: verified.id,
      type: "login",
    }).populate("user");
  }
  return login_token;
};
module.exports = { UserToken, getLoginTokenFromRequest };
