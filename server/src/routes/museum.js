import express from "express";
import { getMuseums, getMuseumNamePlace } from "../controllers/museum.js";

const museumRouter = express.Router();

museumRouter.get("/", getMuseums);
museumRouter.get("/museumName/:key", getMuseumNamePlace);

export default museumRouter;
