const  acceptVerifcation  = require("../controller/adminController");

const router = require("express").Router();
router.put("/:userId/accept", acceptVerifcation);

module.exports = router;
