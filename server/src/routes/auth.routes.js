const { signup, login } = require("../controller/authController");
const { getuser } = require("../controller/userController");
const authToken = require("../middlewares/authToken");



const router = require("express").Router();
router.get("/",authToken,getuser)
router.post("/signup", signup);
router.post("/login", login);

module.exports = router