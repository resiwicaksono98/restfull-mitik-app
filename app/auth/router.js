const express = require("express");
const { verifySuperAdmin, verifyAdmin } = require("../../middleware/auth");
const { registerAdmin, loginAdmin, adminLogin } = require("./adminController");
const {
  loginEngineer,
  engineerLogin,
  registerEngineer,
} = require("./engineerController");
const {
  registerUser,
  loginUser,
  userLogin,
  logoutUser,
} = require("./userController");

const router = express.Router();

// General
router.delete("/logout", logoutUser);

// User Router
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", userLogin);

// Admin Router
router.post("/admin/register", verifySuperAdmin, registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/me", adminLogin);

// Engineer Router
router.post("/engineer/register", verifyAdmin, registerEngineer);
router.post("/engineer/login", loginEngineer);
router.get("/engineer/me", engineerLogin);

module.exports = router;
