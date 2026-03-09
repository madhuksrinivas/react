import { useState } from "react";

function ConditionalRendering_React() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("guest");
  const [notifications, setNotifications] = useState([]);

  // Method 1: if/else with early return
  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please Log In</h1>
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      </div>
    );
  }

  // Method 2: Ternary operator
  const welcomeMessage = isLoggedIn ? "Welcome back!" : "Please log in";

  // Method 3: Logical && operator
  const showAdminPanel = userRole === "admin";

  return (
    <div>
      <h1>Conditional Rendering Examples</h1>

      {/* Method 2: Ternary operator */}
      <div style={{ marginBottom: "20px" }}>
        <h3>{welcomeMessage}</h3>
        <p>Status: {isLoggedIn ? "✓ Logged in" : "✗ Logged out"}</p>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>

      {/* Method 3: Logical && operator */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Role: {userRole}</h3>
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="guest">Guest</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {showAdminPanel && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#ffe0e0",
            }}
          >
            🔐 Admin Panel: You have full access
          </div>
        )}

        {userRole === "user" && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#e0f0ff",
            }}
          >
            👤 User Dashboard: Limited access
          </div>
        )}
      </div>

      {/* Method 4: Multiple conditions with switch/case pattern */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Notifications</h3>
        <button
          onClick={() =>
            setNotifications([
              ...notifications,
              `Alert ${notifications.length + 1}`,
            ])
          }
        >
          Add Notification
        </button>
        <button onClick={() => setNotifications([])}>Clear All</button>

        {notifications.length === 0 ? (
          <p style={{ color: "#666" }}>No notifications</p>
        ) : notifications.length === 1 ? (
          <p>You have 1 notification</p>
        ) : (
          <p>You have {notifications.length} notifications</p>
        )}

        {notifications.length > 0 && (
          <ul>
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ConditionalRendering_React;

// Method 1: Early return - best for authentication/loading states
// Method 2: Ternary (condition ? true : false) - inline if/else
// Method 3: Logical && (condition && <Component />) - show/hide elements
// Method 4: Complex conditions - combine multiple approaches
