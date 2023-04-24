// import { Request, Response } from "express";
// import { error, wrapRequestHandler } from "../helpers/response";
// import { verify } from "jsonwebtoken";
// import { JWT_SIGNING_KEY, LOGIN_TYPE } from "../constant";
// import { UserToken } from "../models/UserToken";
// import { User } from "../models/user";
const { error, wrapRequestHandler } = require("../helpers/response");
const { verify } = require("jsonwebtoken");
const { User } = require("../models/User");
const { UserToken } = require("../models/UserToken");
const authMiddleware = () =>
  wrapRequestHandler(async (req, res, next) => {
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

    const token = await UserToken.findOne({
      id: verified.id,
      type: "login",
    }).populate("user");

    req.login_token = token;
    next();
  });

module.exports = { authMiddleware };
