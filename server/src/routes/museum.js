import express from "express";
import { getMuseumById, getMuseums } from "../controllers/museum.js";

const museumRouter = express.Router();

museumRouter.get("/", getMuseums);

// Gokhan Added
museumRouter.get("/:museumId", getMuseumById);

export default museumRouter;
