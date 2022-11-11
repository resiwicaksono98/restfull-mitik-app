const { verifyAdmin } = require("../../middleware/auth");
const {
  createInvoice,
  getAllInvoice,
  getOneInvoice,
  updateInvoice,
  destroyInvoice,
} = require("./controller");

const router = require("express").Router();

// Create Invoice
router.post("/invoices/:orderId", verifyAdmin, createInvoice);
// Get All Invoice
router.get("/invoices", verifyAdmin, getAllInvoice);
// get One Invoice
router.get("/invoices/:id", verifyAdmin, getOneInvoice);
// Upate Invoice
router.put("/invoices/:id", verifyAdmin, updateInvoice);
// Delete invoice
router.delete("/invoices/:id", verifyAdmin, destroyInvoice);

module.exports = router;
