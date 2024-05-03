const express = require("express");
const userRouter = require('./routes/user.routes')
const adminRouter = require('./routes/admin.routes')
const authRouter = require('./routes/auth.routes')
const imageRouter = require('./routes/image.routes')
const messageRouter = require('./routes/message.routes')
const conversationRouter = require('./routes/conversation.routes')
const serivcesRouter = require('./routes/service.routes')
const reportRouter = require('./routes/reports.routes')

const router = express();
router.use(express.json());
router.use("/messages", messageRouter);
router.use("/conversation", conversationRouter);
router.use("/users", userRouter)
router.use("/serivces", serivcesRouter)
router.use("/admin", adminRouter)
router.use("/image", imageRouter)
router.use("/auth", authRouter)
router.use("/reports", reportRouter)
module.exports = router;