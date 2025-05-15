// // authentication  for the users to login,
// // signup, head to the dashboard and stay logged in.
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // register users
// exports.register = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       userName,
//       phone,
//       email,
//       password,
//       accountType,
//       Nationality,
//       IdNumber,
//       EmploymentStatus,
//       monthlyIncome,
//     } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const accountNumber = phone.replace(/\D/g, "").slice(0, 10);

//     const user = await User.create({
//       firstName,
//       lastName,
//       userName,
//       phone,
//       email,
//       password: hashedPassword,
//       accountNumber,
//       accountType,
//       Nationality,
//       IdNumber,
//       EmploymentStatus,
//       monthlyIncome,
//     });

//     // the response status
//     res.status(201).json({
//       message: "user created successfully",
//       accountNumber: user.accountNumber,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "user Registration failed" });
//     console.error("error experienced registering users", error);
//   }
// };

// // login users
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   // if user is not found
//   if (!user) return res.status(404).json({ error: "user not found" });
//   // if user is restricted
//   if (user.isRestricted)
//     return res.status(403).json({ error: "Account Restricted" });
//   // if user match any record in the database
//   const isMatch = bcrypt.compare(password, user.password);
//   if (!isMatch)
//     return res.status(400).json({ error: "invalid credentials used.." });
//   // token sent to individual users.
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });

//   res.json({ token });
// };

// // get dashboard
// exports.getDashboard = async (req, res) => {
//   // get individuals users dashboards redirects
//   const user = await User.findById(req.user.id);
//   const welcome = `Welcome ${user.lastName} ${user.firstName}`;
//   res.json({ welcome, accountNumber: user.accountNumber });
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register users
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      phone,
      email,
      password,
      accountType,
      Nationality,
      IdNumber,
      EmploymentStatus,
      monthlyIncome,
    } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email is already used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = phone.replace(/\D/g, "").slice(0, 10);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      phone,
      email,
      password: hashedPassword,
      accountNumber,
      accountType,
      Nationality,
      IdNumber,
      EmploymentStatus,
      monthlyIncome,
    });

    res.status(201).json({
      message: "User created successfully",
      accountNumber: user.accountNumber,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      error: "user Registration failed",
      message: error.message,
      stack: error.stack,
    });
  }
};

// Login users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isRestricted)
      return res.status(403).json({ error: "Account Restricted" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Get user dashboard
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const welcome = `Welcome ${user.lastName} ${user.firstName}`;
    res.json({ welcome, accountNumber: user.accountNumber });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ error: "Failed to get dashboard" });
  }
};
