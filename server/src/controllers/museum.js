import Museum from "../models/Museum.js";

export const getMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();
    res.status(200).json({ success: true, result: museums });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unable to get museums, please try again later",
    });
  }
};

export const getMuseumNamePlace = async (req, res) => {
  const { key } = req.params;
  try {
    const museumNamePlaceResult = await Museum.find({
      $or: [
        { name: { $regex: key, $options: "i" } },
        { "address.city": { $regex: key, $options: "i" } },
      ],
    }).exec();
    res.status(200).json({ success: true, result: museumNamePlaceResult });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Museum with the name ${key} was not found`,
    });
  }
};
