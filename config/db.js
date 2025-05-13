const mongoose = require("mongoose");
require("dotenv").config();

// remember to connect the database later on - TODO remove
const connectDB = async () => {
  try {
    // database connected successfully
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    // error catch and sent to the backend
    console.log("Database error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
