// Button component that accepts children
function Button({ children, onClick, variant = "primary" }) {
  const styles = {
    primary: { background: "#007bff", color: "white" },
    secondary: { background: "#6c757d", color: "white" },
    danger: { background: "#dc3545", color: "white" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
}

// Card component that composes other components
function Card({ title, children, footer }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      <div>{children}</div>
      {footer && (
        <div
          style={{
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px solid #ddd",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// Layout component using composition
function Layout({ header, sidebar, children }) {
  return (
    <div>
      {header && (
        <header style={{ padding: "20px", background: "#f5f5f5" }}>
          {header}
        </header>
      )}
      <div style={{ display: "flex" }}>
        {sidebar && (
          <aside
            style={{ width: "200px", padding: "20px", background: "#fafafa" }}
          >
            {sidebar}
          </aside>
        )}
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      </div>
    </div>
  );
}

function ComponentComposition() {
  return (
    <div>
      <h2>Component Composition</h2>

      {/* Simple composition with children */}
      <Button variant="primary" onClick={() => alert("Primary clicked!")}>
        Click Me
      </Button>

      {/* Card composition */}
      <Card
        title="User Profile"
        footer={
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="primary">Edit</Button>
            <Button variant="secondary">Share</Button>
          </div>
        }
      >
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
      </Card>

      {/* Layout composition */}
      <Layout
        header={<h1>My App Header</h1>}
        sidebar={
          <nav>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
        }
      >
        <h2>Main Content Area</h2>
        <p>This is where your main content goes.</p>
      </Layout>
    </div>
  );
}

export default ComponentComposition;

// Composition: building complex UIs by combining simple components
// Uses props.children and named props to pass components
// More flexible than inheritance
