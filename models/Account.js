const mongoose = require("mongoose");

const accountSchemma = new mongoose.Schema({
  userName: String,
  IdNumber: String,
  Gender: String,
  country: String,
  age: String,
  State: String,
  Pin: String,
});

module.exports = mongoose.model("Accounts", accountSchemma);
