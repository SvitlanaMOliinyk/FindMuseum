import Offer from "../models/Offer.js";
import Museum from "../models/Museum.js";

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      numberOfTickets: { $gt: 0 },
    })
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
  const { buyer, numberOfTickets } = req.body;
  const { id } = req.params;
  try {
    const offer = await Offer.findOne({
      $and: [{ _id: id }, { _id: id, buyers: buyer }],
    });
    if (!offer) {
      await Offer.updateOne(
        { _id: id },
        {
          $set: {
            numberOfTickets: numberOfTickets,
          },
          $push: {
            buyers: [buyer],
          },
        }
      );
      res.status(200).json({
        success: true,
        result: "Congratulations! Your offer is in your email-box now!",
      });
    } else {
      res
        .status(208)
        .json({ success: true, result: "You have already got the offer!" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unable to update offer, please try again later",
    });
  }
};
