const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

const formatMessage = require("./utils/messages");
const { userJoin, userLeave, getRoomUsers, getCurrentUserEmail } = require("./utils/users");

const botName = "ChatCord Bot";
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.status(200).send("Chat app");
});
io.on("connection", (socket) => {
    socket.on("joinRoom", ({ email }) => {
        userJoin(socket.id, email);
    });

    socket.on("notify", ({ msg, email }) => {
        const user = getCurrentUserEmail(email);
        io.to(user.id).emit("notification", msg);
    });
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        console.log(`${socket.id} disconnected `);
        if (user) {
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

http.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
