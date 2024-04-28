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

