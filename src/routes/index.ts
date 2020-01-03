import express from "express";
import userRouter from "./user";
const Router = express.Router();

Router.use("/user", userRouter);

export default Router;
