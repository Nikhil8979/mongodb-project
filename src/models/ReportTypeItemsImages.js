const mongoose = require("mongoose");
const { CHECK_IN, CHECK_OUT } = require("../constants");
const ReportTypeItemImagesSchema = new mongoose.Schema({
  inspectionId: mongoose.Types.ObjectId,
  inspectionType: {
    type: String,
    enum: [CHECK_IN, CHECK_OUT],
  },
  typeId: mongoose.Types.ObjectId,
  typeItemId: mongoose.Types.ObjectId,
  typeItemImages: [String],
});

const ReportTypeItemImage = mongoose.model(
  "ReportTypeItemImage",
  ReportTypeItemImagesSchema
);

module.exports = { ReportTypeItemImage };
