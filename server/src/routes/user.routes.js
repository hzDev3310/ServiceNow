
const {
    removeUser,
    updateUser,
    getOtherUser,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.get("/:id", getOtherUser);

  router.delete("/:userId", removeUser);
  router.put("/:userId/:attribute", updateUser);
  
  module.exports = router;
  