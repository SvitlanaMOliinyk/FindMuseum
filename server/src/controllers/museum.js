import Museum from "../models/Museum.js";
import { museumData } from "../data/museumsData.js";

const createMuseumCollection = async () => {
  await Museum.deleteMany({});
  try {
    await Museum.create(museumData);
    console.log("data successfully inserted");
  } catch (error) {
    console.log(error);
  }
};

export const getMuseums = async (req, res) => {
  try {
    createMuseumCollection();
    const museums = await Museum.find();
    res.status(200).json({ success: true, result: museums });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Unable to get museums, try again later" });
  }
};
