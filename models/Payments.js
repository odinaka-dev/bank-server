const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transfer: Number,
  bankName: String,
  bankAccount: String,
  remark: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", paymentSchema);
