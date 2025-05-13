const mongoose = require("mongoose");

const adminSchemma = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Admin", adminSchemma);
