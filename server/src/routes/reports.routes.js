
const {sendReport,getReports} = require('../controller/ReportController')


const router = require("express").Router();
router.post("/",sendReport)
router.get("/",getReports)



module.exports = router