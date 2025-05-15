const mongoose = require("mongoose");

const UserSchemma = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  Nationality: String,
  phone: String,
  email: String,
  password: String,
  accountNumber: String,
  AccountType: String,
  IdNumber: Number,
  EmploymentStatus: String,
  monthlyIncome: String,
  isRestricted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchemma);
