import { useState, useCallback, memo } from "react";

// Child component wrapped in React.memo
const ExpensiveChild = memo(({ onClick, name }) => {
  console.log(`${name} rendered`);
  return <button onClick={onClick}>Click {name}</button>;
});

function UseCallbackHook() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Without useCallback: new function on every render
  // With useCallback: same function reference unless dependencies change
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <h2>useCallback Example</h2>

      <p>Count: {count}</p>
      <p>Other: {other}</p>

      <ExpensiveChild onClick={handleClick} name="Memoized Button" />
      <button onClick={() => setOther(other + 1)}>
        Increment Other (child won't re-render)
      </button>
    </div>
  );
}

export default UseCallbackHook;

// useCallback returns a memoized callback function.
// Prevents creating new function instances on every render.
// Useful when passing callbacks to optimized child components.
