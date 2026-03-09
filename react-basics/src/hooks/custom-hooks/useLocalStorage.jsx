import { useState, useEffect } from "react";

// Custom hook for localStorage persistence
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// Example usage
function CustomHookExample() {
  const [name, setName] = useLocalStorage("username", "Guest");
  const [count, setCount] = useLocalStorage("count", 0);

  return (
    <div>
      <h2>Custom Hook - useLocalStorage</h2>

      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <p>Saved name: {name}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      <p style={{ fontSize: "12px", color: "#666" }}>
        Values persist in localStorage - refresh page to test!
      </p>
    </div>
  );
}

export default CustomHookExample;

// Custom hooks start with "use" and can combine other hooks.
// They encapsulate reusable logic that can be shared across components.
// This hook syncs state with localStorage automatically.
