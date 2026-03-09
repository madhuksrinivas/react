import ComponentComposition from "./component-composition/ComponentComposition";
import ContainerPresentation from "./container-presentation-components/ContainerPresentation";
import LiftingStateUp from "./lifting-state-up/LiftingStateUp";
import PropDrilling from "./prop-drilling/PropDrilling";
import ReusableComponents from "./reusable-components/ReusableComponents";

function ComponentArchitecture_React() {
  return (
    <div>
      <h1>Component Architecture Patterns</h1>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <ComponentComposition />
      </div>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <ContainerPresentation />
      </div>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <LiftingStateUp />
      </div>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <PropDrilling />
      </div>

      <div
        style={{
          marginBottom: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <ReusableComponents />
      </div>
    </div>
  );
}

export default ComponentArchitecture_React;

// Component Architecture: patterns for organizing and structuring React components
// Includes: composition, container/presentation, lifting state, prop drilling, reusability
