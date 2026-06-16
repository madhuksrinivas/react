import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useUpdateNoteQuery } from "../hooks/useUpdateNoteQuery";
import { useFetchNoteByIdQuery } from "../hooks/useFetchNoteByIdQuery";
import NoteForm from "../components/NoteForm";
import { useNoteForm } from "../hooks/useNoteForm";

function EditPage() {
  const { id } = useParams();
  const {
    title,
    content,
    errors,
    handleTitleChange,
    handleContentChange,
    validate,
    setTitle,
    setContent,
  } = useNoteForm();

  const navigate = useNavigate();
  const { mutateAsync: updateNote, isPending: isSubmitting } =
    useUpdateNoteQuery();
  const { data: existingNote, isLoading: isLoadingNote } =
    useFetchNoteByIdQuery(id);

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [existingNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    try {
      await updateNote({ id, title: title.trim(), content: content.trim() });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update note";
      toast.error(message);
    }
  };

  if (isLoadingNote) {
    return (
      <div className="create-page">
        <p style={{ color: "#94a3b8" }}>Loading note...</p>
      </div>
    );
  }

  return (
    <NoteForm
      title={title}
      content={content}
      errors={errors}
      isSubmitting={isSubmitting}
      submitLabel="Save Changes"
      loadingLabel="Saving..."
      onTitleChange={handleTitleChange}
      onContentChange={handleContentChange}
      onSubmit={handleSubmit}
    />
  );
}

export default EditPage;
