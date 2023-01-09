import express from "express";
import { addTry, deleteTry, getAllTries, getByUserId } from "../controllers/try-controller.js";
const tryRouter = express.Router();

tryRouter.get("/",getAllTries);
tryRouter.post("/add",addTry);
tryRouter.delete("/:id",deleteTry);
tryRouter.get("/user/:id",getByUserId);


export default tryRouter;