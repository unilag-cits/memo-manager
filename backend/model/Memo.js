const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema(
  {
    memoTo: {
      type: String,
      required: true,
    },
    memoFrom: {
      type: String,
      required: true,
    },
    memoTitle: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    path: {
      type: String,
    },
    memoRemark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Memo = mongoose.model("Memo", memoSchema);

module.exports = Memo;
