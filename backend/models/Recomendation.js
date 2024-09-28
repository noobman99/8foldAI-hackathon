const mongoose = require("mongoose");

const Decimal128 = mongoose.Schema.Types.Decimal128;
const recomendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  circular: {
    type: Boolean,
    default: false,
  },
  trustScore: {
    type: Decimal128,
  },
  sentimentScore: {
    type: Decimal128,
  },
  blob: {
    type: String,
  },
});

module.exports = mongoose.model("Recomendation", recomendationSchema);
