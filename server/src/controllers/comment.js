import Comment, { validateComment } from "../models/Comment.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { addCommentIdToUser } from "../controllers/user.js";
import { addCommentIdToMuseum } from "../controllers/museum.js";

export const createComment = async (req, res) => {
  try {
    const { userId, museumId, rate, review } = req.body.comment;
    const newCommentToCreate = {
      userId,
      museumId,
      rate,
      review,
    };
    if (typeof newCommentToCreate !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'newCommentToCreate' object. Received: ${JSON.stringify(
          newCommentToCreate
        )}`,
      });

      return;
    }

    const errorList = validateComment(newCommentToCreate);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newComment = await Comment.create(newCommentToCreate);
      //Gokhan: after created a new comment we are setting the comment Id to the user's comments array;
      const userWithAddedComment = addCommentIdToUser(
        newComment.userId,
        newComment._id
      );
      //Gokhan: after created a new comment we are setting the comment Id to the museum's comments array;
      const museumWithAddedComment = addCommentIdToMuseum(
        newComment.museumId,
        newComment._id
      );
      res.status(201).json({ success: true, comment: newComment });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create comment, try again later",
    });
  }
};

export const updateComment = async (req, res) => {
  const { commentId, rate, review } = req.body.comment;
  try {
    const commentToUpdate = {
      rate,
      review,
    };
    if (typeof commentToUpdate !== "object") {
      return res.status(400).json({
        success: false,
        msg: `You need to provide a 'commentToUpdate' object. Received: ${JSON.stringify(
          commentToUpdate
        )}`,
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $set: commentToUpdate },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, type: "update", comment: updatedComment });
  } catch (err) {
    logError(err);
    res
      .status(500)
      .json({ success: false, msg: "You can update only your review" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body.comment;
  try {
    const deletedComment = await Comment.findByIdAndRemove(commentId);
    res.status(200).json({ success: true, deletedComment: deletedComment });
  } catch (error) {
    logError(err);
    res
      .status(500)
      .json({
        success: false,
        msg: `Encountered a error while deleting comment with id: ${commentId}`,
      });
  }
};
