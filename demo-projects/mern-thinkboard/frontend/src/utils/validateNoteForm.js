export const validateNoteForm = (title, content, setErrors) => {
  const nextErrors = { title: "", content: "" };
  if (!title.trim()) {
    nextErrors.title = "Title is required";
  }
  if (!content.trim()) {
    nextErrors.content = "Content is required";
  }
  setErrors(nextErrors);
  return !nextErrors.title && !nextErrors.content;
};
