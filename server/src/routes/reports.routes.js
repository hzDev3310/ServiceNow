
const {sendReport,getReports, deleteReport} = require('../controller/ReportController')


const router = require("express").Router();
router.post("/",sendReport)
router.get("/",getReports)
router.delete("/:id",deleteReport)



module.exports = router