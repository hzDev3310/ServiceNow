const express = require("express");
const { uploadimg } = require("../controller/imageController"); 
const upload = require("../middlewares/storage");
const imageRouter = express.Router();


imageRouter.post("/:userId/:attribute", upload.single("image"), uploadimg);

module.exports = imageRouter;
