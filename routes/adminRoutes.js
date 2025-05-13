const express = require("express");
router = express.Router();
const {
  adminLogin,
  getAllUsers,
  restrictUser,
} = require("../controllers/adminControllers");

router.post("login", adminLogin);
router.get("users", getAllUsers);
router.put("restrict/:userId", restrictUser);

module.exports = router;
