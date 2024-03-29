const express = require("express");
const { verifyUser, verifyAdmin } = require("../../middleware/auth");
const {
  createOrder,
  getMyOrder,
  getOneOrder,
  getAllOrder,
  updateOrder,
  destroyOrder,
  destroyOrderUser,
  getOneOrderAdmin,
  createOrderAdminOnly,
} = require("./controller");

const router = express.Router();

// User only
router.post("/orders", verifyUser, createOrder);
router.get("/orders", verifyUser, getMyOrder);
router.get("/orders/:id", verifyUser, getOneOrder);
router.delete("/orders/:id", verifyUser, destroyOrderUser);

// Admin only
router.post("/admin/orders", verifyAdmin, createOrderAdminOnly);
router.get("/admin/orders", verifyAdmin, getAllOrder);
router.put("/admin/orders/:id", verifyAdmin, updateOrder);
router.get("/admin/orders/:id", verifyAdmin, getOneOrderAdmin);
router.delete("/admin/orders/:id", verifyAdmin, destroyOrder);

module.exports = router;
