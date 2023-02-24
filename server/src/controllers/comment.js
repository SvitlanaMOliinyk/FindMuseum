import Comment, { validateComment } from "../models/Comment.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

export const createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    if (typeof comment !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'comment' object. Received: ${JSON.stringify(
          comment
        )}`,
      });

      return;
    }

    const errorList = validateComment(comment);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newComment = await Comment.create(comment);

      res.status(201).json({ success: true, comment: newComment });
    }
  } catch (error) {
    logError(error);
    // if (error.name === "MongoServerError" && error.code === 11000) {
    //   res.status(400).json({ success: false, msg: "Email already exists" });
    // } else {
    res.status(500).json({
      success: false,
      msg: "Unable to create comment, try again later",
    });
    // }
  }
};
