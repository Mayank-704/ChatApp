import express from "express"
import dotenv from "dotenv"
 import cookieParser from "cookie-parser";

 import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js" 
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json())//this middleware allow us to extract data from req in json format.

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes)
app.use("api/message",messageRoutes)


app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT)
    connectDB();
})