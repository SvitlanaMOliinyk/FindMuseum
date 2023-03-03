import express from "express";
import {
  createUser,
  getAllComments,
  loginUser,
  updateUser,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.get("/comments/:userId", getAllComments);

export default userRouter;
