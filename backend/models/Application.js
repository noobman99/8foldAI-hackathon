const mongoose = require("mongoose");

const Decimal128 = mongoose.Schema.Types.Decimal128;
const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
    },
    resume: {
      type: String,
    },
    recommendation: {
      type: [String],
    },
    skillScore: {
      type: Decimal128,
    },
    skillTrust: {
      type: Decimal128,
    },
    experienceAccuracy: {
      type: Decimal128,
    },
    experienceConsistency: {
      type: [String],
    },
    recoScore: {
      type: Decimal128,
    },
    recoTrust: {
      type: Decimal128,
    },
    finalScore: {
      type: Decimal128,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
