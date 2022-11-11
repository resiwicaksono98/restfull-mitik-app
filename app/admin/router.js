const { verifyAdmin, verifySuperAdmin } = require("../../middleware/auth");
const { getAllAdmin, deleteAdmin } = require("./controller");

const router = require("express").Router();

router.get("/admins", verifyAdmin, getAllAdmin);
router.delete("/admins/:id", verifySuperAdmin, deleteAdmin);

module.exports = router;
