const apiRouter = require("./apiRouter");
const { Router } = require("express");
const updateRouter = Router();
module.exports = { updateRouter };
apiRouter.use("/update", updateRouter);
