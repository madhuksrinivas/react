import { useState } from "react";

// Simulate a heavy component that takes time to load
function HeavyComponent() {
  const [count, setCount] = useState(0);

  // Simulate some heavy computation
  const data = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: Math.random() * 100,
  }));

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: "#4CAF50" }}>🎯 Heavy Component Loaded!</h3>
      <p>This component contains {data.length} items and was loaded lazily.</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}

export default HeavyComponent;
