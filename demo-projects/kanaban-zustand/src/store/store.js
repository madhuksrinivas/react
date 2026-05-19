import { create } from "zustand";
import axios from "axios";
import { BASE_API_URL } from "../constants";
import { ALERT_MESSAGES, ALERT_MESSAGES_TYPE } from "../constants";

export const useStore = create((set) => ({
  tasks: [],
  alert: { type: "", msg: "" },
  setAlert: (alert) => set({ alert: { ...alert } }),
  fetchTasks: async () => {
    try {
      const { data } = await axios.get(BASE_API_URL);
      set({ tasks: data });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({
        alert: {
          type: ALERT_MESSAGES_TYPE.ERROR,
          msg: ALERT_MESSAGES.FETCH_TASKS_FAILED,
        },
      });
    }
  },
  addTask: async ({ ...taskObj }) => {
    const { data: newTask } = await axios.post(BASE_API_URL, taskObj);
    set((state) => ({
      tasks: [...state.tasks, newTask],
      alert: {
        type: ALERT_MESSAGES_TYPE.SUCCESS,
        msg: ALERT_MESSAGES.TASK_ADDED_SUCCESS,
      },
    }));
  },
  deleteTask: async (id) => {
    await axios.delete(`${BASE_API_URL}/${id}`);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      alert: {
        type: ALERT_MESSAGES_TYPE.SUCCESS,
        msg: ALERT_MESSAGES.TASK_DELETED_SUCCESS,
      },
    }));
  },
  updateTaskStatus: async (id, status) => {
    const { data: updatedTask } = await axios.patch(`${BASE_API_URL}/${id}`, {
      status: status,
    });
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: status } : task,
      ),
      alert: {
        type: ALERT_MESSAGES_TYPE.SUCCESS,
        msg: ALERT_MESSAGES.TASK_STATUS_UPDATED_SUCCESS,
      },
    }));
  },
  updateTask: async (id, updatefields) => {
    const { data: updatedTask } = await axios.patch(`${BASE_API_URL}/${id}`, {
      ...updatefields,
    });
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
      alert: {
        type: ALERT_MESSAGES_TYPE.SUCCESS,
        msg: ALERT_MESSAGES.TASK_UPDATED_SUCCESS,
      },
    }));
  },
}));

// import { create } from "zustand";

// export const useStore = create((set) => ({
//   tasks: [],
//   fetchTasks: async () => {
//     try {
//       const response = await fetch("http://localhost:3000/tasks");
//       const data = await response.json();
//       set({ tasks: data });
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//     }
//   },
//   addTask: async (title, status) => {
//     const response = await fetch("http://localhost:3000/tasks", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, status }),
//     });
//     const newTask = await response.json();
//     set((state) => ({
//       tasks: [...state.tasks, newTask],
//     }));
//   },
//   deleteTask: async (id) => {
//     const response = await fetch(`http://localhost:3000/tasks/${id}`, {
//       method: "DELETE",
//     });
//     if (response.ok) {
//       set((state) => ({
//         tasks: state.tasks.filter((task) => task.id !== id),
//       }));
//     }
//   },
//   updateTask: async (id, updateFields) => {
//     const response = await fetch(`http://localhost:3000/tasks/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updateFields),
//     });
//     const updatedTask = await response.json();
//     set((state) => ({
//       tasks: state.tasks.map((task) =>
//         task.id === id ? { ...task, ...updatedTask } : task,
//       ),
//     }));
//   },
// }));
