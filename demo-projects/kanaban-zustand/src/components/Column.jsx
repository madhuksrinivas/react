import React, { useState } from "react";
import "../styles/Column.css";
import Task from "./Task";
import { useStore } from "../store/store";
import { useShallow } from "zustand/react/shallow";
import Modal from "./Modal";

function Column({ state }) {
  const [isOpen, setIsOpen] = useState(false);
  const tasks = useStore(
    useShallow((store) => store.tasks.filter((task) => task.status === state)),
  );
  return (
    <div className="column">
      <div className="title-wrapper">
        <p>{state}</p>
        <button onClick={() => setIsOpen(!isOpen)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} />
      ))}
      {isOpen && <Modal status={state} onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default Column;
