import { useState, useMemo } from "react";

function UseMemoHook() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Expensive calculation - only re-runs when count changes
  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += count;
    }
    return result;
  }, [count]);

  return (
    <div>
      <h2>useMemo Example</h2>

      <p>Count: {count}</p>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <div style={{ marginTop: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here (won't recalculate)"
        />
      </div>
    </div>
  );
}

export default UseMemoHook;

// useMemo caches a calculated value between renders.
// Only recalculates when dependencies change.
// Use for expensive computations to avoid unnecessary work.
