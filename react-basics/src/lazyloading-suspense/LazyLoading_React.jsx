import { Suspense, lazy, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Lazy load components - they will be loaded only when needed
const HeavyComponent = lazy(() => import("./HeavyComponent"));
const Dashboard = lazy(() => import("./Dashboard"));
const Profile = lazy(() => import("./Profile"));

function LazyLoading_React() {
  const [showHeavy, setShowHeavy] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ borderBottom: "3px solid #333", paddingBottom: "10px" }}>
        Lazy Loading & Suspense in React
      </h1>

      {/* Example 1: Basic Lazy Loading */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#333" }}>1. Basic Lazy Loading</h2>
        <p>Click the button to load a heavy component on demand:</p>
        <button
          onClick={() => setShowHeavy(!showHeavy)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {showHeavy ? "Hide" : "Load"} Heavy Component
        </button>

        {showHeavy && (
          <Suspense
            fallback={<LoadingSpinner message="Loading Heavy Component..." />}
          >
            <HeavyComponent />
          </Suspense>
        )}
      </div>

      {/* Example 2: Tab-based Lazy Loading */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "#333" }}>2. Tab-based Lazy Loading</h2>
        <p>Components are loaded only when you click on their tabs:</p>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "dashboard" ? "#2196F3" : "#ddd",
              color: activeTab === "dashboard" ? "white" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "profile" ? "#FF9800" : "#ddd",
              color: activeTab === "profile" ? "white" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab(null)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        <Suspense
          fallback={<LoadingSpinner message="Loading tab content..." />}
        >
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "profile" && <Profile />}
        </Suspense>
      </div>

      {/* Information Box */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderLeft: "4px solid #007bff",
          borderRadius: "4px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>💡 Key Concepts</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>React.lazy():</strong> Enables dynamic imports for
            components
          </li>
          <li>
            <strong>Suspense:</strong> Handles loading states while lazy
            components load
          </li>
          <li>
            <strong>Code Splitting:</strong> Reduces initial bundle size by
            loading code on demand
          </li>
          <li>
            <strong>Fallback UI:</strong> Shows loading indicator while waiting
            for component
          </li>
          <li>
            <strong>Performance:</strong> Improves initial load time by
            deferring non-critical code
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LazyLoading_React;
