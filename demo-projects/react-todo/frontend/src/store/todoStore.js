import { create } from "zustand";

const API = "http://localhost:5000";

export const useTodoStore = create((set) => ({
  todos: [],
  completedTodos: [],
  alert: { type: "", msg: "" },

  setAlert: (alert) => set({ alert }),

  // Fetch all active todos from MongoDB
  fetchTodos: async () => {
    const res = await fetch(`${API}/todos`);
    const data = await res.json();
    set({ todos: data });
  },

  // Fetch completed todos from MongoDB
  fetchCompletedTodos: async () => {
    const res = await fetch(`${API}/todos/completed`);
    const data = await res.json();
    set({ completedTodos: data });
  },

  // Add a new todo to MongoDB
  addTodo: async (text) => {
    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },

  // Edit a todo in MongoDB
  editTodo: async (id, text) => {
    const res = await fetch(`${API}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updated = await res.json();
    set((state) => ({
      todos: state.todos.map((t) => (t._id === id ? updated : t)),
    }));
  },

  // Mark a todo as completed in MongoDB
  completeTodo: async (id) => {
    await fetch(`${API}/todos/${id}/complete`, { method: "PATCH" });
    set((state) => ({
      todos: state.todos.filter((t) => t._id !== id),
    }));
  },

  // Delete an active todo from MongoDB
  deleteTodo: async (id) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    set((state) => ({
      todos: state.todos.filter((t) => t._id !== id),
    }));
  },

  // Delete a completed todo from MongoDB
  deleteCompleteTodo: async (id) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    set((state) => ({
      completedTodos: state.completedTodos.filter((t) => t._id !== id),
    }));
  },
}));
