const express = require("express");
const userRouter = require('./routes/user.routes')
const adminRouter = require('./routes/admin.routes')
const authRouter = require('./routes/auth.routes')
const imageRouter = require('./routes/image.routes')
const  messageRouter = require('./routes/message.routes')

const router = express();
router.use(express.json());

router.use("/conversation",messageRouter);
router.use("/users", userRouter)
router.use("/admin", adminRouter)
router.use("/image", imageRouter)
router.use("/auth", authRouter)

module.exports = router;