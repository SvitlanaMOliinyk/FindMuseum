import express from "express";
import { createComment } from "../controllers/comment.js";

const commentRouter = express.Router();

commentRouter.post("/create", createComment);

export default commentRouter;
