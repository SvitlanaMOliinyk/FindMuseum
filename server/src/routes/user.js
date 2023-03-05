import express from "express";
import {
  createUser,
  getAllComments,
  loginUser,
  updateUser,
  updateFavorite,
  profilePictureUpload,
} from "../controllers/user.js";

const userRouter = express.Router();
userRouter.post("/upload", profilePictureUpload);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.put("/update/:id", updateFavorite);
userRouter.get("/comments/:userId", getAllComments);

export default userRouter;
