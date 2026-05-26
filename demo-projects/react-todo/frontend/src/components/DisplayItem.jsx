import React from "react";
import "../styles/DisplayItem.css";
import Button from "./Button";

function DisplayItem({ todos, onEdit, onDelete, onComplete }) {
  return (
    <div className="display-item">
      {todos?.map((todo) => (
        <div key={todo._id} className="todo-item color-yellow">
          <label>{todo.text}</label>
          <div className="todo-actions">
            {onEdit && (
              <Button onClick={() => onEdit(todo)} className="edit-btn">
                ✏️
              </Button>
            )}
            {onDelete && (
              <Button onClick={() => onDelete(todo._id)} className="delete-btn">
                🗑️
              </Button>
            )}
            {onComplete && (
              <Button
                onClick={() => onComplete(todo._id)}
                className="complete-btn"
              >
                ✔️
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayItem;
