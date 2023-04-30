const { createRouter } = require("../../routes/createRouter");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { wrapRequestHandler, success } = require("../../helpers/response");
const { Template } = require("../../models/Template");
const handler = async (req, res) => {
  const { name, types } = req.body;

  await Template.create({
    name,
    types,
  });
  return res.json(success("Template saved successfully"));
};

createRouter.post("/template", authMiddleware(), wrapRequestHandler(handler));
