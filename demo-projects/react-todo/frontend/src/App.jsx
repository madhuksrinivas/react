import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Completed from "./components/Completed";
import { useTodoStore } from "./store/todoStore";
import { useShallow } from "zustand/react/shallow";
import TodoAll from "./components/TodoAll";

function App() {
  const [activeTab, setActiveTab] = useState("todo");
  const [editingTodo, setEditingTodo] = useState(null); // { _id, text } or null

  const {
    todos,
    completedTodos,
    fetchTodos,
    fetchCompletedTodos,
    addTodo,
    editTodo,
    deleteTodo,
    completeTodo,
    deleteCompleteTodo,
  } = useTodoStore(
    useShallow((store) => ({
      todos: store.todos,
      completedTodos: store.completedTodos,
      fetchTodos: store.fetchTodos,
      fetchCompletedTodos: store.fetchCompletedTodos,
      addTodo: store.addTodo,
      editTodo: store.editTodo,
      deleteTodo: store.deleteTodo,
      completeTodo: store.completeTodo,
      deleteCompleteTodo: store.deleteCompleteTodo,
    })),
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (activeTab === "completed") fetchCompletedTodos();
  }, [activeTab]);

  return (
    <div className="App">
      <Header setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "todo" && (
        <TodoInput
          addTodo={addTodo}
          editTodo={editTodo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
        />
      )}
      {activeTab === "todo" && (
        <TodoList
          todos={todos}
          setEditingTodo={setEditingTodo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      )}
      {activeTab === "completed" && (
        <Completed
          completedTodos={completedTodos}
          deleteCompleteTodo={deleteCompleteTodo}
        />
      )}
      {activeTab === "todo-all" && (
        <TodoAll
          todos={todos}
          setEditingTodo={setEditingTodo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      )}
    </div>
  );
}

export default App;
