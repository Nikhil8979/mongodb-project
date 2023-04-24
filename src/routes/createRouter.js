const apiRouter = require("./apiRouter");
const { Router } = require("express");
const createRouter = Router();
apiRouter.use("/create", createRouter);

module.exports = { createRouter };
