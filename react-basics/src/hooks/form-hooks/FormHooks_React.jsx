import { useState } from "react";
import UseActionStateHook from "./UseActionStateHook";
import UseFormStatusHook from "./UseFormStatusHook";
import UseOptimisticHook from "./UseOptimisticHook";

function FormHooks_React() {
  const [activeTab, setActiveTab] = useState("action-state");

  const tabs = [
    { id: "action-state", label: "useActionState" },
    { id: "form-status", label: "useFormStatus" },
    { id: "optimistic", label: "useOptimistic" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>
        Form Hooks in React
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
        {activeTab === "action-state" && <UseActionStateHook />}
        {activeTab === "form-status" && <UseFormStatusHook />}
        {activeTab === "optimistic" && <UseOptimisticHook />}
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h3>About Form Hooks</h3>
        <p>
          Form hooks are specialized React hooks introduced in React 19 for
          handling form submissions and actions.
        </p>
        <ul>
          <li>
            <strong>useActionState:</strong> Manages form actions with pending
            states and results
          </li>
          <li>
            <strong>useFormStatus:</strong> Provides status of parent form
            (pending, data, method, action)
          </li>
          <li>
            <strong>useOptimistic:</strong> Shows optimistic updates while
            waiting for async operations
          </li>
        </ul>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
          Note: These hooks are available in React 19+. For earlier versions,
          use similar patterns with useState and useTransition.
        </p>
      </div>
    </div>
  );
}

export default FormHooks_React;
