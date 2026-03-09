import { useState, useEffect } from "react";

function UseEffectHook() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Runs after every render
  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  // Runs only once on mount (empty dependency array)
  useEffect(() => {
    console.log("Component mounted");

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup function runs on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Current time: {time}</p>
    </div>
  );
}

export default UseEffectHook;

// useEffect runs after render - for side effects like API calls, timers, subscriptions.
// Return a cleanup function to prevent memory leaks.
// Dependency array controls when effect re-runs.
