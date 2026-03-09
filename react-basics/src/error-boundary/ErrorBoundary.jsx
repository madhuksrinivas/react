import React from "react";

// Error Boundary Component (must be a class component)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            border: "2px solid red",
            background: "#ffe0e0",
          }}
        >
          <h2>⚠️ Something went wrong!</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <details style={{ marginTop: "10px" }}>
            <summary>Error details</summary>
            <pre>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={() =>
              this.setState({ hasError: false, error: null, errorInfo: null })
            }
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Error Boundary must be a class component
// Catches errors in child components during rendering
// Shows fallback UI instead of crashing the app
