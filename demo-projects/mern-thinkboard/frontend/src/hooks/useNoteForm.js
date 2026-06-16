import { useState } from "react";
import { validateNoteForm } from "../utils/validateNoteForm";

const initialNoteFormState = {
  title: "",
  content: "",
  errors: { title: "", content: "" },
};

export const useNoteForm = () => {
  const [title, setTitle] = useState(initialNoteFormState.title);
  const [content, setContent] = useState(initialNoteFormState.content);
  const [errors, setErrors] = useState(initialNoteFormState.errors);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (errors.content) setErrors((prev) => ({ ...prev, content: "" }));
  };

  const validate = () => {
    return validateNoteForm(title, content, setErrors);
  };

  return {
    title,
    content,
    errors,
    setTitle,
    setContent,
    handleTitleChange,
    handleContentChange,
    validate,
  };
};
