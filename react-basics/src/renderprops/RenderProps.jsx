import React from "react";

function MouseTracker({ render }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ height: "200px", border: "1px solid #ccc" }}
    >
      {render(position)}
    </div>
  );
}

function RenderProps() {
  return (
    <div>
      <h1>Render Props Example</h1>
      <MouseTracker
        render={(position) => (
          <p>
            Mouse position: ({position.x}, {position.y})
          </p>
        )}
      />
      <MouseTracker
        render={(position) => (
          <h3>
            X: {position.x} | Y: {position.y}
          </h3>
        )}
      />
    </div>
  );
}

export default RenderProps;

// render is a function prop that tells MouseTracker what to render.
// MouseTracker shares its state (mouse position) by calling render(position).
// Different render functions can display the data differently.
