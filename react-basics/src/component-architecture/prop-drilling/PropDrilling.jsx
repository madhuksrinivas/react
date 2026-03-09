import { useState } from "react";

// Deep nested component that needs data from top
function DisplayMessage({ message, user }) {
  return (
    <div style={{ padding: "10px", background: "#e3f2fd" }}>
      <h4>Final Display:</h4>
      <p>User: {user}</p>
      <p>Message: {message}</p>
    </div>
  );
}

// Middle component - just passes props down (prop drilling)
function MessageContainer({ message, user }) {
  return (
    <div style={{ padding: "10px", border: "2px solid blue" }}>
      <h4>Message Container (Level 2)</h4>
      <p>⚠️ This component doesn't use these props, just passes them down</p>
      <MessageWrapper message={message} user={user} />
    </div>
  );
}

// Another middle component
function MessageWrapper({ message, user }) {
  return (
    <div style={{ padding: "10px", border: "2px solid green" }}>
      <h4>Message Wrapper (Level 3)</h4>
      <p>⚠️ This component also just passes props down</p>
      <DisplayMessage message={message} user={user} />
    </div>
  );
}

// Top level component with state
function PropDrilling() {
  const [user, setUser] = useState("John Doe");
  const [message, setMessage] = useState("Hello World!");

  return (
    <div>
      <h2>Prop Drilling Problem</h2>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            User:
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Message:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
      </div>

      <div
        style={{
          padding: "10px",
          border: "2px solid #FF5722",
          borderRadius: "5px",
          background: "#fff3e0",
        }}
      >
        <h4>App Component (Level 1 - Has State)</h4>
        <p style={{ fontSize: "12px", color: "#666" }}>
          📦 Props flow through multiple levels...
        </p>
        <MessageContainer message={message} user={user} />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#ffebee",
          borderRadius: "5px",
        }}
      >
        <h4>⚠️ Prop Drilling Issues:</h4>
        <ul style={{ fontSize: "14px" }}>
          <li>Props passed through 3 levels</li>
          <li>Middle components don't use the props</li>
          <li>Hard to maintain - changes require updating all levels</li>
          <li>Solution: Context API or state management library</li>
        </ul>
      </div>
    </div>
  );
}

export default PropDrilling;

// Prop drilling: passing props through multiple levels
// Middle components don't use props, just pass them down
// Problem: hard to maintain, verbose, breaks component independence
// Solution: Context API, Redux, or composition patterns
