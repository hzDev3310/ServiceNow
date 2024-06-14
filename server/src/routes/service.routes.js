const { getServices,emproveAccount, getproviders, deleteService } = require("../controller/ServiceController");
const authToken = require("../middlewares/authToken");

const router = require("express").Router();
router.get('/',authToken,getproviders)
router.get("/:latitude/:longitude", getServices);
router.post("/:userId", emproveAccount);
router.put('/:id',deleteService);

module.exports = router;