import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  updateFavorite,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.put("/update/:id", updateFavorite);

// we will use this later
// userRouter.get("/:id")

export default userRouter;
