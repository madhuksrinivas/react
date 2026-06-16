import Note from "../model/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Note not found with the given ID" });
    }
    const note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found with the given ID" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res
      .status(500)
      .json({ message: "Error fetching note", error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    console.log("Note created successfully:", newNote);
    res
      .status(201)
      .json({ message: "Note created successfully!", note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Note not found with the given ID" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { returnDocument: "after" },
    );
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found with the given ID" });
    }
    console.log(`Note with ID ${id} updated successfully`);
    res.status(200).json({
      message: "Note updated successfully!",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ message: "Error updating note", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Note not found with the given ID" });
    }
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found with the given ID" });
    }
    console.log(`Note with ID ${id} deleted successfully`);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error({ message: "Error deleting note", error: error.message });
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};
