import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js" 
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

app.use(express.json())//this middleware allow us to extract data from req in json format.

const PORT = process.env.PORT;

app.use("/api/auth",authRoutes)


app.listen(PORT,()=>{
    console.log("Server is listening at port " + PORT)
    connectDB();
})