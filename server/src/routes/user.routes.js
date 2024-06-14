
const {
  removeUser,
  updateUser,
  getOtherUser,
  getUsers,
} = require("../controller/userController");

const authToken = require("../middlewares/authToken")

const router = require("express").Router();

router.get("/:id", getOtherUser);
router.get("/", authToken, getUsers)
router.delete("/:userId", removeUser);
router.put("/:userId/:attribute", updateUser);

module.exports = router;
