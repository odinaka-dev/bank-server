const express = require("express");
const router = express.Router();
// register new  users
const {
  register,
  login,
  getDashboard,
} = require("../controllers/authcontrollers");
// transactions
const {
  transact,
  getAllTransactions,
} = require("../controllers/transactionControllers");
const { protect } = require("../middlewares/authMiddleware");

// routes
router.post("/register", register);
router.post("/login", login);
router.get("/user-dashboard", protect, getDashboard);
router.post("/transfer", transact);
router.get("/all-transfers", getAllTransactions);

module.exports = router;
