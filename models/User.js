const mongoose = require("mongoose");

const UserSchemma = new mongoose.Schema({
  firstName: String,
  lastName: String,
  UserName: String,
  phone: String,
  email: String,
  password: String,
  accountNumber: String,
  isRestricted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchemma);
