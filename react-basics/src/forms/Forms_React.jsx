import { useState } from "react";
import ControlledForm from "./controlled-components/ControlledForm";
import UncontrolledForm from "./uncontrolled-components/UncontrolledForm";
import FormValidation from "./form-validation/FormValidation";
import InputHandling from "./input-handling/InputHandling";

function Forms_React() {
  const [activeTab, setActiveTab] = useState("controlled");

  const tabs = [
    { id: "controlled", label: "Controlled" },
    { id: "uncontrolled", label: "Uncontrolled" },
    { id: "validation", label: "Validation" },
    { id: "input-handling", label: "Input Handling" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
        React Forms
      </h1>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: activeTab === tab.id ? "#007bff" : "#e0e0e0",
              color: activeTab === tab.id ? "white" : "#333",
              border: "none",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "controlled" && <ControlledForm />}
        {activeTab === "uncontrolled" && <UncontrolledForm />}
        {activeTab === "validation" && <FormValidation />}
        {activeTab === "input-handling" && <InputHandling />}
      </div>
    </div>
  );
}

export default Forms_React;
