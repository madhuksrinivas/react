import { useState } from "react";

// Reusable Button Component
function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
}) {
  const variants = {
    primary: { background: "#2196F3", color: "white" },
    secondary: { background: "#6c757d", color: "white" },
    success: { background: "#4CAF50", color: "white" },
    danger: { background: "#f44336", color: "white" },
  };

  const sizes = {
    small: { padding: "5px 10px", fontSize: "12px" },
    medium: { padding: "10px 20px", fontSize: "14px" },
    large: { padding: "15px 30px", fontSize: "16px" },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...variants[variant],
        ...sizes[size],
      }}
    >
      {children}
    </button>
  );
}

// Reusable Input Component
function Input({ label, type = "text", value, onChange, placeholder, error }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      {label && (
        <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: "8px 12px",
          border: error ? "2px solid #f44336" : "1px solid #ddd",
          borderRadius: "4px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
      {error && (
        <span style={{ color: "#f44336", fontSize: "12px" }}>{error}</span>
      )}
    </div>
  );
}

// Reusable Card Component
function Card({ title, children, footer }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {title && (
        <h3
          style={{
            marginTop: 0,
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
          }}
        >
          {title}
        </h3>
      )}
      <div>{children}</div>
      {footer && (
        <div
          style={{
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px solid #eee",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// Demo component using reusable components
function ReusableComponents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    if (value && !value.includes("@")) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    alert(`Form submitted!\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <div>
      <h2>Reusable Components</h2>

      {/* Buttons Demo */}
      <Card title="Reusable Buttons">
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button variant="primary" size="small">
            Small Primary
          </Button>
          <Button variant="secondary" size="medium">
            Medium Secondary
          </Button>
          <Button variant="success" size="large">
            Large Success
          </Button>
          <Button variant="danger" onClick={() => alert("Danger!")}>
            Danger
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>

      {/* Form Demo */}
      <Card
        title="Reusable Form Inputs"
        footer={
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={!name || !email || emailError}
            >
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setName("");
                setEmail("");
                setEmailError("");
              }}
            >
              Clear
            </Button>
          </div>
        }
      >
        <Input
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Enter your name"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            validateEmail(value);
          }}
          placeholder="Enter your email"
          error={emailError}
        />
      </Card>

      {/* Info Card */}
      <Card title="Benefits of Reusable Components">
        <ul style={{ margin: 0 }}>
          <li>Write once, use everywhere</li>
          <li>Consistent UI across the app</li>
          <li>Easier to maintain and update</li>
          <li>Props make them flexible</li>
          <li>Reduce code duplication</li>
        </ul>
      </Card>
    </div>
  );
}

export default ReusableComponents;

// Reusable components: generic, configurable via props
// Can be used throughout the app with different data/styles
// Promote consistency and reduce duplication
