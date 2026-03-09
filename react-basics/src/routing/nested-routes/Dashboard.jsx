import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/dashboard/profile" style={{ marginRight: "10px" }}>
          Profile
        </Link>
        <Link to="/dashboard/settings" style={{ marginRight: "10px" }}>
          Settings
        </Link>
        <Link to="/dashboard/analytics">Analytics</Link>
      </nav>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
