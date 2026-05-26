import React from "react";
import "../styles/Header.css";

function Header({ setActiveTab, activeTab }) {
  return (
    <div className="header">
      <h1 className="header-title">Task Focus</h1>
      <h2 className="header-subtitle">Stay Focused and Productive</h2>
      <hr />
      <div className="header-buttons">
        <button className="header-button" onClick={() => setActiveTab("todo")}>
          <h2 className={activeTab === "todo" ? "underline" : ""}>ToDo</h2>
        </button>
        <button
          className="header-button"
          onClick={() => setActiveTab("todo-all")}
        >
          <h2 className={activeTab === "todo-all" ? "underline" : ""}>
            Todo All
          </h2>
        </button>
        <button
          className="header-button"
          onClick={() => setActiveTab("completed")}
        >
          <h2 className={activeTab === "completed" ? "underline" : ""}>
            Completed
          </h2>
        </button>
      </div>
    </div>
  );
}

export default Header;
