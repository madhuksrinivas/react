import { Link } from "react-router";
import "../styles/notes.css";
import { Edit, Trash } from "lucide-react";
import { useDeleteNoteQuery } from "../hooks/useDeleteNoteQuery";
import toast from "react-hot-toast";

function Notes({ notesData }) {
  const { mutateAsync: deleteNote, isPending } = useDeleteNoteQuery();

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete note",
      );
    }
  };

  const formatDate = (dateValue) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return notesData.length === 0 ? (
    <div className="no-notes-message">
      <h2>
        No notes found. Click <Link to="/create">here</Link> to create your
        first note!
      </h2>
    </div>
  ) : (
    <div className="notes-container">
      {notesData.map((note) => (
        <div key={note._id} className="note-item">
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <h6>{formatDate(note.createdAt)}</h6>
          <div className="note-actions">
            <Link
              to={`/notes/${note._id}/edit`}
              className={`note-edit-link ${isPending ? "disabled" : ""}`}
              aria-disabled={isPending}
              onClick={(event) => {
                if (isPending) event.preventDefault();
              }}
            >
              <Edit className="note-edit-icon" />
            </Link>
            <button
              type="button"
              className="note-trash-button"
              onClick={() => handleDelete(note._id)}
              disabled={isPending}
            >
              <Trash className="note-trash-icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;
