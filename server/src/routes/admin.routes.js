const { getproviders } = require("../controller/ServiceController");
const  {acceptVerifcation, generateAdminKey, signup,login, dashboard, getAdmin, rejectVerifcation}  = require("../controller/adminController");
const authToken = require("../middlewares/authToken");
const isAdmin = require("../middlewares/isAdmin");

const router = require("express").Router();
router.put("/:userId/accept", acceptVerifcation);
router.put("/:userId/reject", rejectVerifcation);
router.get("/providers",getproviders)
router.post('/signup',isAdmin ,signup)
router.post('/login' ,login)
router.post('/',generateAdminKey)
router.get('/',authToken,dashboard)
router.get('/:id',authToken,getAdmin)

module.exports = router;
