import ErrorBoundary from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";
import SafeComponent from "./SafeComponent";

function ErrorBoundary_React() {
  return (
    <div>
      <h1>Error Boundaries</h1>

      <div
        style={{ marginBottom: "20px", padding: "15px", background: "#fff3e0" }}
      >
        <h3>What are Error Boundaries?</h3>
        <p>
          Error boundaries catch JavaScript errors in child components, log
          them, and display a fallback UI instead of crashing the entire app.
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {/* Buggy component wrapped in error boundary */}
        <div>
          <h3>With Error Boundary</h3>
          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
          <p style={{ fontSize: "12px", marginTop: "10px" }}>
            👆 This component is protected. When it crashes, only it shows the
            error UI.
          </p>
        </div>

        {/* Safe component - unaffected by errors */}
        <div>
          <h3>Safe Component</h3>
          <SafeComponent />
          <p style={{ fontSize: "12px", marginTop: "10px" }}>
            👆 This component continues working even if the buggy one crashes.
          </p>
        </div>
      </div>

      <div
        style={{ marginTop: "20px", padding: "15px", background: "#e3f2fd" }}
      >
        <h3>Key Points:</h3>
        <ul>
          <li>Error boundaries must be class components</li>
          <li>Use getDerivedStateFromError() and componentDidCatch()</li>
          <li>
            They catch errors during rendering, lifecycle methods, and
            constructors
          </li>
          <li>
            They don't catch errors in event handlers (use try-catch for those)
          </li>
          <li>Place error boundaries strategically to isolate failures</li>
        </ul>
      </div>
    </div>
  );
}

export default ErrorBoundary_React;

// Error boundaries prevent entire app crashes
// Catch errors in child components and show fallback UI
// Must be class components (no hooks version yet)
