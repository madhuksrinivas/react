import React from "react";
import "../styles/create-page.css";

function NoteForm({
  title,
  content,
  errors,
  isSubmitting,
  submitLabel,
  loadingLabel,
  onTitleChange,
  onContentChange,
  onSubmit,
}) {
  return (
    <div className="create-page">
      <form className="create-form" onSubmit={onSubmit} noValidate>
        <h2 className="create-heading">
          {submitLabel === "Save Changes" ? "Edit Note" : "Create a New Note"}
        </h2>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="title" className="create-title-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter a short title"
              className="create-title-input"
              value={title}
              onChange={onTitleChange}
              maxLength={80}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : "title-help"}
            />
            <div className="helper-row">
              <small id="title-help" className="input-help">
                Keep it concise and specific.
              </small>
              <small className="char-count">{title.length}/80</small>
            </div>
            {errors.title && (
              <p id="title-error" className="input-error">
                {errors.title}
              </p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="content" className="create-content-label">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your note details here"
              className="create-content-textarea"
              value={content}
              onChange={onContentChange}
              rows={7}
              maxLength={1000}
              aria-invalid={Boolean(errors.content)}
              aria-describedby={
                errors.content ? "content-error" : "content-help"
              }
            />
            <div className="helper-row">
              <small id="content-help" className="input-help">
                Add enough detail so the note is useful later.
              </small>
              <small className="char-count">{content.length}/1000</small>
            </div>
            {errors.content && (
              <p id="content-error" className="input-error">
                {errors.content}
              </p>
            )}
          </div>

          <div className="button-row">
            <button
              type="submit"
              className="create-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? loadingLabel : submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
