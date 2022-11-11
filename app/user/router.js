const { verifyAdmin } = require("../../middleware/auth");
const { getUser, deleteUser } = require("./controller");

const router = require("express").Router();

router.get("/admin/users", verifyAdmin, getUser);
router.delete("/admin/users/:id", verifyAdmin, deleteUser);

module.exports = router;
