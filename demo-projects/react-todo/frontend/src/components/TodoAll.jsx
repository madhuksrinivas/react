import { useState } from "react";
import "../styles/TodoAll.css";
import DisplayItem from "./DisplayItem";
import Filter from "./Filter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoAll({ todos, setEditingTodo, deleteTodo, completeTodo }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [enableFilter, setEnableFilter] = useState(false);
  console.log("Selected Date:", selectedDate);
  const filteredTodos = todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt);
    if (!enableFilter) return true;
    return (
      todoDate.getDate() === selectedDate.getDate() &&
      todoDate.getMonth() === selectedDate.getMonth() &&
      todoDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const handleSelectedDateChange = (date) => {
    setEnableFilter(true);
    setSelectedDate(date);
  };
  return (
    <div className="todo-all">
      <div className="filter-section">
        <label htmlFor="date-picker">Select Date to filter: </label>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={(date) => handleSelectedDateChange(date)}
        />
        <button onClick={() => setEnableFilter(false)}>Reset</button>
      </div>
      <DisplayItem
        todos={filteredTodos}
        onEdit={setEditingTodo}
        onDelete={deleteTodo}
        onComplete={completeTodo}
      />
    </div>
  );
}

export default TodoAll;
