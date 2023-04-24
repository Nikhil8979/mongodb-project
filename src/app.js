const express = require("express");
const app = express();
const os = require("os");
const fileUpload = require("express-fileupload");
const cors = require("cors");
module.exports = { app };
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    preserveExtension: true,
    parseNested: true,
  })
);
app.use((req, res, next) => {
  req.body = {
    ...req.body,
    ...req.files,
  };
  next();
});
app.use(express.json());
app.use(cors());
app.use(express.static("assets"));
app.set("views", "./src/views");
app.set("view engine", "ejs");
