import Offer from "../models/Offer.js";
import Museum from "../models/Museum.js";

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate({ path: "museumId", model: Museum })
      .exec();
    res.status(200).json({ success: true, result: offers });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unable to get offers, please try again later",
    });
  }
};

export const updateOffer = async (req, res) => {
  const { numberOfTickets } = req.body;
  const { id } = req.params;

  try {
    const offer = await Offer.findByIdAndUpdate(id, {
      $set: { numberOfTickets: numberOfTickets },
    });
    res.status(200).json({ success: true, result: offer });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unable to update offer, please try again later",
    });
  }
};
