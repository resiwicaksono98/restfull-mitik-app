const { verifyAdmin } = require("../../middleware/auth");
const { getAllEngineer, deleteEngineer } = require("./controller");

const router = require("express").Router();

router.get("/engineers", getAllEngineer);
router.delete("/engineers/:id", verifyAdmin, deleteEngineer);

module.exports = router;
