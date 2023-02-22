import express from "express";
import { getMuseums, getMuseumNamePlace } from "../controllers/museum.js";

const museumRouter = express.Router();

museumRouter.get("/", getMuseums);
museumRouter.get("/:key", getMuseumNamePlace);

export default museumRouter;
