import React, { useState } from "react";
import "../styles/Task.css";
import classNames from "classnames";
import { useStore } from "../store/store";
import { useShallow } from "zustand/react/shallow";
import { STATUSES } from "../constants";
import { ALERT_MESSAGES, ALERT_MESSAGES_TYPE } from "../constants";

function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title),
  );
  const [taskDetails, setTaskDetails] = useState({
    title: task.title,
    description: task.description,
  });
  const [enableEdit, setEnableEdit] = useState(false);

  const { deleteTask, updateTaskStatus, updateTask, setAlert } = useStore(
    useShallow((store) => ({
      deleteTask: store.deleteTask,
      updateTaskStatus: store.updateTaskStatus,
      updateTask: store.updateTask,
      setAlert: store.setAlert,
    })),
  );

  const handleCancelEdit = () => {
    setTaskDetails({ title: task.title, description: task.description });
    setEnableEdit(false);
  };

  const handleSave = () => {
    try {
      if (!taskDetails.title.trim()) {
        setAlert({
          type: ALERT_MESSAGES_TYPE.ERROR,
          msg: ALERT_MESSAGES.TITLE_EMPTY,
        });
        return;
      }
      if (!taskDetails.description.trim()) {
        setAlert({
          type: ALERT_MESSAGES_TYPE.ERROR,
          msg: ALERT_MESSAGES.DESCRIPTION_EMPTY,
        });
        return;
      }
      updateTask(task.id, taskDetails);
    } catch (error) {
      setAlert({
        type: ALERT_MESSAGES_TYPE.ERROR,
        msg: error.message,
      });
    }
    setEnableEdit(false);
  };

  return (
    <div className="task">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {!enableEdit ? (
          <h3>{task.title}</h3>
        ) : (
          <input
            value={taskDetails.title}
            onChange={(e) =>
              setTaskDetails({ ...taskDetails, title: e.target.value })
            }
          />
        )}
        <div>
          <button
            onClick={() => setEnableEdit(!enableEdit)}
            disabled={enableEdit}
          >
            🖊️
          </button>
          <button onClick={() => deleteTask(task.id)} disabled={enableEdit}>
            🗑️
          </button>
        </div>
      </div>
      {!enableEdit ? (
        <p>{task.description}</p>
      ) : (
        <textarea
          value={taskDetails.description}
          onChange={(e) =>
            setTaskDetails({ ...taskDetails, description: e.target.value })
          }
        />
      )}
      <div className="btm-wrapper">
        <div>
          {enableEdit ? (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : null}
        </div>
        <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
          className={classNames("status", task.status)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Task;
