import express from "express"
import dotenv from "dotenv"
 import cookieParser from "cookie-parser";
 import cors from "cors"
import { app, server} from "./lib/Socket.js"
 import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js" 
import { connectDB } from "./lib/db.js";

import path from "path"

dotenv.config();

app.use(cookieParser());
app.use(express.json())//this middleware allow us to extract data from req in json format.
app.use(cors({
    origin :"http://localhost:5173",
    credentials: true
}))

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENVIRONMENT === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontens","dist","index.html"));
    })
}


server.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT)
    connectDB();
})