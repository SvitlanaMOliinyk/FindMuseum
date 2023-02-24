import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const { SchemaTypes } = mongoose;
const commentSchema = new mongoose.Schema(
  {
    museumId: { type: SchemaTypes.ObjectId, ref: "Museum", required: true },
    rate: { type: String, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

export const validateComment = (commentObject) => {
  const errorList = [];
  const allowedKeys = ["museumId", "rate", "review"];

  const validatedKeysMessage = validateAllowedFields(
    commentObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (commentObject.museumId == null) {
    errorList.push("museumId is a required field");
  }

  if (commentObject.rate == null) {
    errorList.push("rate is a required field");
  }

  if (!commentObject.review) {
    errorList.push("review is a required field");
  }

  return errorList;
};

export default Comment;
