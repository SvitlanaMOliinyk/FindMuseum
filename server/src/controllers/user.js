import User, { validateUser } from "../models/User.js";

import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create(user);

      res.status(201).json({ success: true, user: newUser });
    }
  } catch (error) {
    logError(error);
    if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(400).json({ success: false, msg: "Email already exists" });
    } else {
      res.status(500).json({
        success: false,
        msg: "Unable to create user, try again later",
      });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user } = req.body;
    const userData = await User.findOne({ email: user.email });

    if (!userData) {
      res.status(404).json({ success: false, msg: "Wrong Credentials!" });
      return;
    }

    if (user.password === userData.password) {
      res.status(201).json({ success: true, user: userData });
    } else {
      res.status(400).json({ success: false, msg: "Wrong Credentials!" });
      return;
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to login user, try again later" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (typeof user !== "object") {
      return res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: user,
      },
      { new: true }
    );
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    logError(err);
    res
      .status(500)
      .json({ success: false, msg: "You can update only your account" });
  }
};

// update the favorite list
export const updateFavorite = async (req, res) => {
  try {
    const { userFavorite } = req.body;

    if (typeof userFavorite !== "object") {
      return res.status(400).json({
        success: false,
        msg: `You need to provide a 'favorite' array. Received: ${JSON.stringify(
          userFavorite
        )}`,
      });
    }

    const updatedFavorite = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { favoriteMuseums: userFavorite },
      },
      { new: true }
    );
    res.status(200).json({ success: true, userFavorite: updatedFavorite });
  } catch (err) {
    logError(err);
    res
      .status(500)
      .json({ success: false, msg: "Your favorite list is Not updated" });
  }
};
