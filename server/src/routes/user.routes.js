
const emproveAccount = require("../controller/ServiceController");
const {
    getServices,
    removeUser,
    updateUser,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.get("/:id", getServices);
  router.get("/:latitude/:longitude/:serviceName", getServices);
  router.post("/:userId", emproveAccount);
  router.delete("/:userId", removeUser);
  router.put("/:userId/:attribute", updateUser);
  
  module.exports = router;
  