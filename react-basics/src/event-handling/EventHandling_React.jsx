import { useState } from "react";

function EventHandling_React() {
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [keyPressed, setKeyPressed] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Click event
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  // Click with event parameter
  const handleButtonClick = (e) => {
    console.log("Button clicked:", e.target);
    alert("Button was clicked!");
  };

  // Input change event
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Mouse move event
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Key press event
  const handleKeyPress = (e) => {
    setKeyPressed(e.key);
  };

  // Form submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
  };

  // Inline event handler
  const handleDoubleClick = () => {
    alert("Double clicked!");
  };

  return (
    <div>
      <h1>Event Handling in React</h1>

      {/* Click Event */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Click Events</h3>
        <button onClick={handleClick}>Click Me (Count: {clickCount})</button>
        <button onClick={handleButtonClick} style={{ marginLeft: "10px" }}>
          Alert Click
        </button>
        <button
          onDoubleClick={handleDoubleClick}
          style={{ marginLeft: "10px" }}
        >
          Double Click
        </button>
      </div>

      {/* Input Events */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Input Events</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
          style={{ padding: "8px", width: "300px" }}
        />
        <p>You typed: {inputValue}</p>
      </div>

      {/* Mouse Events */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Mouse Events</h3>
        <div
          onMouseMove={handleMouseMove}
          style={{
            height: "150px",
            background: "#f5f5f5",
            padding: "10px",
            cursor: "crosshair",
          }}
        >
          Move your mouse here
          <p>
            Mouse position: X: {mousePosition.x}, Y: {mousePosition.y}
          </p>
        </div>
      </div>

      {/* Keyboard Events */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Keyboard Events</h3>
        <input
          type="text"
          onKeyPress={handleKeyPress}
          placeholder="Press any key..."
          style={{ padding: "8px", width: "300px" }}
        />
        <p>Last key pressed: {keyPressed}</p>
      </div>

      {/* Form Events */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Form Submit Event</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{ padding: "8px", width: "300px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{ padding: "8px", width: "300px" }}
            />
          </div>
          <button type="submit">Submit Form</button>
        </form>
      </div>

      {/* Inline vs Reference */}
      <div style={{ padding: "15px", border: "1px solid #ddd" }}>
        <h3>Event Handler Patterns</h3>
        <button onClick={() => alert("Inline arrow function")}>
          Inline Handler
        </button>
        <button onClick={handleClick} style={{ marginLeft: "10px" }}>
          Reference Handler
        </button>
        <button
          onClick={(e) => console.log("Event:", e)}
          style={{ marginLeft: "10px" }}
        >
          With Event Param
        </button>
      </div>
    </div>
  );
}

export default EventHandling_React;

// Event handling in React uses camelCase (onClick, onChange)
// Pass function reference or inline arrow function
// Use e.preventDefault() to prevent default behavior
// Event object is synthetic (cross-browser compatible)
