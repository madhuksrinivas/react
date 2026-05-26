import React from "react";
import "../styles/Completed.css";
import DisplayItem from "./DisplayItem";

function Completed({ completedTodos, deleteCompleteTodo }) {
  return (
    <div className="completed">
      <DisplayItem todos={completedTodos} onDelete={deleteCompleteTodo} />
    </div>
  );
}

export default Completed;
