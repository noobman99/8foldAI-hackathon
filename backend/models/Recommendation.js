const mongoose = require("mongoose");

const Decimal128 = mongoose.Schema.Types.Decimal128;
const recommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  },
  circular: {
    type: Boolean,
    default: false,
  },
  blob: {
    type: String,
  },
  from: {
    type: String,
  },
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
