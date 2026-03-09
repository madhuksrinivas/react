// Component that works fine
function SafeComponent() {
  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid green",
        background: "#e0ffe0",
      }}
    >
      <h3>✅ Safe Component</h3>
      <p>This component is working perfectly!</p>
      <p>It's isolated from errors in sibling components.</p>
    </div>
  );
}

export default SafeComponent;
