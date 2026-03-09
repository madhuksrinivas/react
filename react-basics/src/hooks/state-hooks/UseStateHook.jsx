import { useState } from "react";

function UseStateHook() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default UseStateHook;

// useState(initialValue) returns [state, setState].
// setState triggers a re-render with the new state value.
