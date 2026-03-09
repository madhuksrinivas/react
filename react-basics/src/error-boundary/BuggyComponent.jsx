import { useState } from "react";

// Component that throws an error
function BuggyComponent() {
  const [count, setCount] = useState(0);

  if (count === 5) {
    // Simulate an error
    throw new Error("I crashed at count 5!");
  }

  return (
    <div style={{ padding: "15px", border: "1px solid #ddd" }}>
      <h3>Buggy Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p style={{ fontSize: "12px", color: "#666" }}>
        💥 This will crash when count reaches 5
      </p>
    </div>
  );
}

export default BuggyComponent;
