// Simulate a dashboard component
function Dashboard() {
  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #2196F3",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: "#2196F3" }}>📊 Dashboard Component</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          <h4>Users</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>1,234</p>
        </div>
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          <h4>Revenue</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>$45,678</p>
        </div>
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          <h4>Orders</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>567</p>
        </div>
        <div
          style={{
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          <h4>Products</h4>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>89</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
