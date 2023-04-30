const mongoose = require("mongoose");
const { CHECK_IN, CHECK_OUT } = require("../constants");
const InspectionSchema = new mongoose.Schema(
  {
    propertyId: mongoose.Types.ObjectId,
    reportType: {
      type: String,
      enum: [CHECK_IN, CHECK_OUT],
    },
    templateId: mongoose.Types.ObjectId,
    typistId: mongoose.Types.ObjectId,
    locationOfKeys: String,
    turnAround: Number,
    internalNotes: String,
    conductDate: Date,
    time: String,
    clerkId: mongoose.Types.ObjectId,
    clientId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

InspectionSchema.virtual("property", {
  ref: "Property",
  localField: "propertyId",
  foreignField: "_id",
  justOne: true,
});
InspectionSchema.virtual("template", {
  ref: "Template",
  localField: "templateId",
  foreignField: "_id",
  justOne: true,
});
InspectionSchema.virtual("typist", {
  ref: "User",
  localField: "typistId",
  foreignField: "_id",
  justOne: true,
});

InspectionSchema.virtual("clerk", {
  ref: "User",
  localField: "clerkId",
  foreignField: "_id",
  justOne: true,
});
InspectionSchema.virtual("client", {
  ref: "User",
  localField: "clientId",
  foreignField: "_id",
  justOne: true,
});
const Inspection = mongoose.model("Inspection", InspectionSchema);
module.exports = { Inspection };
