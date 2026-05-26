import { useState, useEffect } from "react";
import "../styles/TodoInput.css";
import Button from "./Button";

function TodoInput({ addTodo, editTodo, editingTodo, setEditingTodo }) {
  const [text, setText] = useState("");

  // When editingTodo is set, populate the input with its text
  useEffect(() => {
    if (editingTodo) setText(editingTodo.text);
    else setText("");
  }, [editingTodo]);

  const handleSubmit = () => {
    if (text.trim() === "") return;

    if (editingTodo) {
      // Update mode
      editTodo(editingTodo._id, text.trim());
      setEditingTodo(null);
    } else {
      // Add mode
      addTodo(text.trim());
    }
    setText("");
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        placeholder="Enter a task to add to the list"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit} className="add-button">
        {editingTodo ? "Update" : "Add"}
      </Button>
      {editingTodo && (
        <Button onClick={() => setEditingTodo(null)} className="cancel-button">
          Cancel
        </Button>
      )}
    </div>
  );
}

export default TodoInput;
