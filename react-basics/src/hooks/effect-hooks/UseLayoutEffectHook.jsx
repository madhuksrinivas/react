import { useState, useLayoutEffect, useRef } from "react";

function UseLayoutEffectHook() {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    // Runs synchronously before browser paint
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      <h2>useLayoutEffect Example</h2>
      <div ref={divRef} style={{ padding: "20px", border: "1px solid blue" }}>
        This div is {width}px wide
      </div>
    </div>
  );
}

export default UseLayoutEffectHook;

// useLayoutEffect runs synchronously before the browser paints.
// Use for DOM measurements or mutations that need to happen before paint.
// Most cases should use useEffect instead.
