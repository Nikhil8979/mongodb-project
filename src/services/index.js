const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { HOST, PORT, MONGO_CONNECTION_URL } = require("../constants");
const { app } = require("../app");
const { error } = require("../helpers/response");
const requireDir = require("require-dir");
const mongoose = require("mongoose");
requireDir("../controllers", { recurse: true });
requireDir("../routes");
app.use(function (err, req, res, next) {
  res.json(error(err.message));
});

(async () => {
  await mongoose.connect(MONGO_CONNECTION_URL);

  app.listen(Number(PORT), HOST, () => {
    console.log(`listening on ${HOST}:${PORT}`);
  });
})();
