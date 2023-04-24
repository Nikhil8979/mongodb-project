const mongoose = require("mongoose");
const PropertySchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
    reference: Number,
    type: String,
    userId: mongoose.Types.ObjectId,
    furnishingType: String,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", PropertySchema);

module.exports = { Property };
