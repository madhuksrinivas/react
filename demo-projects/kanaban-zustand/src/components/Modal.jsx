import React, { useState } from "react";
import "../styles/Modal.css";
import { useStore } from "../store/store";
import { createPortal } from "react-dom";
import { ALERT_MESSAGES, ALERT_MESSAGES_TYPE } from "../constants";
import { useShallow } from "zustand/react/shallow";

function Modal({ status, onClose }) {
  const [form, setForm] = useState({ title: "", description: "" });
  const { addTask, setAlert } = useStore(
    useShallow((store) => ({
      addTask: store.addTask,
      setAlert: store.setAlert,
    })),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setAlert({
        type: ALERT_MESSAGES_TYPE.ERROR,
        msg: ALERT_MESSAGES.TITLE_EMPTY,
      });
      return;
    }
    if (!form.description.trim()) {
      setAlert({
        type: ALERT_MESSAGES_TYPE.ERROR,
        msg: ALERT_MESSAGES.DESCRIPTION_EMPTY,
      });
      return;
    }
    addTask({ ...form, status });
    setForm({ title: "", description: "" });
    onClose();
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Task to {status}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Enter the task description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </form>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
