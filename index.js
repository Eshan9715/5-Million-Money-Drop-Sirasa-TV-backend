import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from "./routes/user-routes.js";
import tryRouter from "./routes/try-routes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/user",userRouter);
app.use("/api/tries",tryRouter);

mongoose.set("strictQuery", true)

mongoose.connect('mongodb+srv://dropUser:cgLnqiVvpxeatLjm@cluster0.lehrhxm.mongodb.net/?retryWrites=true&w=majority') //cgLnqiVvpxeatLjm
.then(()=>
    app.listen(5000))
.then(()=>
    console.log('connected'))
.catch((err)=>
    console.log(err));