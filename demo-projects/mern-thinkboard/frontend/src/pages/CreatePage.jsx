import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCreateNoteQuery } from "../hooks/useCreateNoteQuery";
import NoteForm from "../components/NoteForm";
import { useNoteForm } from "../hooks/useNoteForm";

function CreatePage() {
  const {
    title,
    content,
    errors,
    handleTitleChange,
    handleContentChange,
    validate,
  } = useNoteForm();

  const navigate = useNavigate();
  const { mutateAsync: createNote, isPending: isSubmitting } =
    useCreateNoteQuery();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    try {
      await createNote({ title: title.trim(), content: content.trim() });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create note";
      toast.error(message);
    }
  };

  return (
    <NoteForm
      title={title}
      content={content}
      errors={errors}
      isSubmitting={isSubmitting}
      submitLabel="Create Note"
      loadingLabel="Creating..."
      onTitleChange={handleTitleChange}
      onContentChange={handleContentChange}
      onSubmit={handleSubmit}
    />
  );
}

export default CreatePage;
