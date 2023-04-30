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
const ReportSchema = new mongoose.Schema(
  {
    templateId: mongoose.Types.ObjectId,
    inspectionId: mongoose.Types.ObjectId,
    inpectionType: String,
    report: [
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

const Report = mongoose.model("Report", ReportSchema);
module.exports = { Report };
