const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getDashboard,
} = require("../controllers/authcontrollers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/user-dashboard", protect, getDashboard);

module.exports = router;
