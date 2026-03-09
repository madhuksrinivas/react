import { useRef, useState } from "react";

function UseRefHook() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  // Increment render count without causing re-render
  renderCount.current += 1;

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h2>useRef Example</h2>

      <p>State count: {count}</p>
      <p>Render count: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment State</button>

      <div style={{ marginTop: "20px" }}>
        <input ref={inputRef} type="text" placeholder="Focus me" />
        <button onClick={focusInput}>Focus Input</button>
      </div>
    </div>
  );
}

export default UseRefHook;

// useRef returns a mutable object that persists across renders.
// Changing ref.current doesn't trigger re-render.
// Common uses: DOM access, storing mutable values, tracking previous values.
