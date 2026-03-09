import { useState } from "react";

function ControlledComponents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ name, email, message });
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      <h2>Controlled Components</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Current value: {name}
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Current value: {email}
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Current value: {message}
          </p>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div
          style={{
            padding: "15px",
            background: "#e0f0ff",
            borderRadius: "5px",
          }}
        >
          <h3>Submitted Data:</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Message:</strong> {submittedData.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default ControlledComponents;

// Controlled components: React state is the "single source of truth"
// Every input change updates state via onChange handler
// Input value is controlled by React state
