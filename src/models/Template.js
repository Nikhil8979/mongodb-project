const mongoose = require("mongoose");

const typeHeadingSchema = new mongoose.Schema({
  label: String,
  name: String,
  placeholder: String,
  required: Boolean,
  type: String,
  category: String,
  editable: Boolean,
  isSelect: Boolean,
});

const typeItemsSchema = new mongoose.Schema({
  value: [
    {
      content: String,
    },
  ],
});
const TemplateSchema = new mongoose.Schema(
  {
    name: String,
    types: [
      {
        name: String,
        placeholder: String,
        backgroundColor: String,
        typeHeadings: [typeHeadingSchema],
        typeItems: [typeItemsSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Template = mongoose.model("Template", TemplateSchema);
module.exports = { Template };
