import express from "express";
import {
  createUser,
  getAllComments,
  loginUser,
  updateUser,
  forgotPassword,
  updateFavorite,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.put("/update/:id", updateFavorite);
userRouter.get("/comments/:userId", getAllComments);
userRouter.post("/forgotPassword", forgotPassword);

export default userRouter;
