import { useOptimistic, useState, useRef, useTransition } from "react";

function UseOptimisticHook() {
  const [isPending, startTransition] = useTransition();
  const messageIdCounter = useRef(1000);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sending: false },
    { id: 2, text: "How are you?", sending: false },
  ]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, { ...newMessage, sending: true }],
  );

  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
  ]);

  const [optimisticTodos, toggleOptimisticTodo] = useOptimistic(
    todos,
    (state, todoId) => {
      return state.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      );
    },
  );

  async function sendMessage(formData) {
    const text = formData.get("message");
    if (!text) return;

    startTransition(async () => {
      // Use temporary ID for optimistic update
      const tempId = `temp-${Date.now()}`;
      const optimisticMessage = {
        id: tempId,
        text,
        sending: true,
      };

      // Add optimistically (shows immediately)
      addOptimisticMessage(optimisticMessage);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update with real data (with real ID from "server")
      messageIdCounter.current += 1;
      const realMessage = {
        id: messageIdCounter.current,
        text,
        sending: false,
      };
      setMessages((prev) => [...prev, realMessage]);

      // Reset form
      document.getElementById("messageForm").reset();
    });
  }

  async function toggleTodo(id) {
    startTransition(async () => {
      // Toggle optimistically (shows immediately)
      toggleOptimisticTodo(id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update with real data
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    });
  }

  async function deleteTodo(id) {
    // Could add optimistic delete here
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>useOptimistic Hook</h3>
      <p>Shows immediate UI updates while waiting for async operations.</p>

      <div style={{ marginTop: "30px" }}>
        <h4>1. Optimistic Messages</h4>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            minHeight: "150px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {optimisticMessages.map((message) => (
            <div
              key={message.id}
              style={{
                padding: "8px",
                marginBottom: "5px",
                backgroundColor: message.sending ? "#fff3cd" : "#e8f5e9",
                border: `1px solid ${message.sending ? "#ffc107" : "#4caf50"}`,
                borderRadius: "4px",
                opacity: message.sending ? 0.6 : 1,
              }}
            >
              {message.text}
              {message.sending && (
                <span style={{ marginLeft: "10px", fontSize: "12px" }}>
                  ⏳ Sending...
                </span>
              )}
            </div>
          ))}
        </div>

        <form id="messageForm" action={sendMessage}>
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            style={{ padding: "8px", width: "300px" }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 15px",
              marginLeft: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h4>2. Optimistic Todo Toggle</h4>
        <div>
          {optimisticTodos.map((todo) => (
            <div
              key={todo.id}
              style={{
                padding: "10px",
                marginBottom: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ marginRight: "10px" }}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.6 : 1,
                  }}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UseOptimisticHook;
