// authentication  for the users to login,
// signup, head to the dashboard and stay logged in.
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// register users
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const accountNumber = phone.replace(/\D/g, "").slice(0, 10);

    const user = await User.create({
      firstName,
      lastName,
      UserName,
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

    // the response status
    res.status(200).json({
      message: "user created successfully",
      accountNumber: user.accountNumber,
    });
  } catch (error) {
    res.status(500).json({ error: "user Registration failed" });
    console.error("error experienced registering users", error);
  }
};

// login users
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // if user is not found
  if (!user) return res.status(404).json({ error: "user not found" });
  // if user is restricted
  if (user.isRestricted)
    return res.status(403).json({ error: "Account Restricted" });
  // if user match any record in the database
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ error: "invalid credentials used.." });
  // token sent to individual users.
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};

// get dashboard
exports.getDashboard = async (req, res) => {
  // get individuals users dashboards redirects
  const user = await User.findById(req.user.id);
  const welcome = `Welcome ${user.lastName} ${user.firstName}`;
  res.json({ welcome, accountNumber: user.accountNumber });
};
