import express from "express";
import { createUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);

// we will use this later
// userRouter.get("/:id")

export default userRouter;
