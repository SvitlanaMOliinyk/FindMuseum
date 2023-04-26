import express from "express";
import {
  getOffers,
  updateOffer,
  getMyOffers,
  cancelMyOffer,
} from "../controllers/offer.js";

const offerRouter = express.Router();

offerRouter.put("/:id", updateOffer);
offerRouter.put("/cancel/:id", cancelMyOffer);
offerRouter.get("/", getOffers);
offerRouter.get("/myOffers/:id", getMyOffers);

export default offerRouter;
