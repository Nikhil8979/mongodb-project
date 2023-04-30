const mongoose = require("mongoose");
const { CHECK_IN, CHECK_OUT } = require("../constants");
const ReportTypeImagesSchema = new mongoose.Schema({
  inspectionId: mongoose.Types.ObjectId,
  inspectionType: {
    type: String,
    enum: [CHECK_IN, CHECK_OUT],
  },
  typeId: mongoose.Types.ObjectId,
  typeImages: [String],
});

const ReportTypeImage = mongoose.model(
  "ReportTypeImage",
  ReportTypeImagesSchema
);

module.exports = { ReportTypeImage };
