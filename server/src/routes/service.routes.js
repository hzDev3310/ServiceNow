const { getServices,emproveAccount } = require("../controller/ServiceController");

const router = require("express").Router();
router.get("/:latitude/:longitude", getServices);
router.post("/:userId", emproveAccount);
module.exports = router;