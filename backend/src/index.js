import express from "express"
import dotenv from "dotenv"
 import cookieParser from "cookie-parser";
 import cors from "cors"

 import messageRoutes from "./routes/message.routes.js"
import authRoutes from "./routes/auth.routes.js" 
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json())//this middleware allow us to extract data from req in json format.
app.use(cors({
    origin :"http://localhost:5173",
    credentials: true
}))

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes)
app.use("api/message",messageRoutes)


app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT)
    connectDB();
})