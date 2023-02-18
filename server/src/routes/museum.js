import express from "express";
import { getMuseums } from "../controllers/museum.js";

const museumRouter = express.Router();

museumRouter.get("/", getMuseums);

export default museumRouter;
