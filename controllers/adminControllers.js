const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// admin login details
exports.adminLogin = async (req, res) => {
  const { userName, password } = req.body;
  const admin = await Admin.findOne({ userName });
  if (!admin) return res.status(404).json({ error: "Not an Admin" });

  const isMatch = bcrypt.compare(password, admin.password);
  if (!isMatch)
    return res.status(400).json({ error: "Invalid admin credentials" });

  // token for the admin
  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token });
};

// get all users - on the admin dashboards
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: err.message });
  }
};

// restrict users
exports.restrictUser = async (req, res) => {
  const { userId } = req.params;
  const { restrict } = req.body;
  await User.findByIdAndUpdate(userId, { isRestricted: restrict });
  res.json({ message: restrict ? "User restricted" : "user unrestricted" });
};

// unrestrict users processes
