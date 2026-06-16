// 1. create a Schema
// 2. create a modal using the schema
// 3. export the modal

import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // createdAt and updatedAt fields will be automatically added
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
