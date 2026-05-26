import DisplayItem from "./DisplayItem";

function TodoList({ todos, setEditingTodo, deleteTodo, completeTodo }) {
  const today = new Date();
  const todayTodos = todos.filter((todo) => {
    const tododDate = new Date(todo.createdAt);
    return (
      today.getDate() === tododDate.getDate() &&
      today.getMonth() === tododDate.getMonth() &&
      today.getFullYear() === tododDate.getFullYear()
    );
  });
  return (
    <DisplayItem
      todos={todayTodos}
      onEdit={setEditingTodo}
      onDelete={deleteTodo}
      onComplete={completeTodo}
    />
  );
}

export default TodoList;
