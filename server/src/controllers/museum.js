import { json } from "express";
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

// Gokhan added
export const getMuseumById = async (req, res) => {
  const id = req.params.museumId;
  try {
    const museum = await Museum.find({ _id: id });
    console.log("Controller MuseumId: ", id);
    console.log("Controller Museum: ", typeof museum);
    res.status(200).json({ success: true, result: museum });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `unable to get museum with id: ${id}`,
    });
  }
};
