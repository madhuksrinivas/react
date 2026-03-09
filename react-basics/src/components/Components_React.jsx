import ControlledComponents from "./ControlledComponents";
import UnControlledComponents from "./UnControlledComponents";

function Components_React() {
  return (
    <div>
      <h1>Controlled vs Uncontrolled Components</h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
      >
        <div
          style={{
            padding: "20px",
            border: "2px solid #4CAF50",
            borderRadius: "8px",
          }}
        >
          <ControlledComponents />
        </div>

        <div
          style={{
            padding: "20px",
            border: "2px solid #FF5722",
            borderRadius: "8px",
          }}
        >
          <UnControlledComponents />
        </div>
      </div>
    </div>
  );
}

export default Components_React;

// Controlled: React state controls input values (recommended)
// Uncontrolled: DOM controls input values, accessed via refs
// Most cases: use controlled components for better control and validation
