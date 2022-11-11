const { verifyAdmin } = require("../../middleware/auth");
const {
  createSparepart,
  getAllSparepart,
  getOneSparepart,
  updateSparepart,
  destroySparepart,
} = require("./controller");

const router = require("express").Router();

// Only Admin Role

router.post("/admin/sparepart", verifyAdmin, createSparepart);
router.get("/admin/sparepart", getAllSparepart);
router.get("/admin/sparepart/:id", getOneSparepart);
router.put("/admin/sparepart/:id", verifyAdmin, updateSparepart);
router.delete("/admin/sparepart/:id", verifyAdmin, destroySparepart);

module.exports = router;
