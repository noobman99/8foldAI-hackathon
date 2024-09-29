const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    expectations: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
