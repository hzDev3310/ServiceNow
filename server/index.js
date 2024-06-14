const express = require("express");
const session  = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./src/config");
const router = require("./src/routes");

const app = express();

app.use(express.urlencoded({extended : true }))

app.use(cors());
app.use(bodyParser.json());
connectToDatabase();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



app.use("/api", router);

app.get('/',(req,res)=>{
  req.session.isAuth = true
  res.json(session)
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUsers = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        console.log("user connected")
        addUsers(userId, socket.id);
        io.emit('getUsers', users);
      
        
    });

    socket.on("sendMessage", ({ senderId, reciverId, content }) => {
        const user = getUser(reciverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", { senderId, content });
        } else {
            console.log("User not found!");
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});
