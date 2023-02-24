import express from "express";
import { createUser, loginUser, updateUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);

export default userRouter;
