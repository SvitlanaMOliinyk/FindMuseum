import express from "express";
import { createUser, loginUser, forgotPassword } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgotPassword", forgotPassword);

export default userRouter;
