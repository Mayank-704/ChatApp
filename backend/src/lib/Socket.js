import express from "express"
import {Server} from "socket.io"
import {createServer} from "http"

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173"],
        credentials: true
    },
} );

const userSocketMap ={}

io.on("connection",(socket)=>{
    console.log("User is Connected ",socket.id);
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;
    console.log(userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    io.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("User Disconnected", socket.id);
    })
})

export {io, server, app};