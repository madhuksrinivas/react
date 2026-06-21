import React from "react";

function FormStep1({ formData, handleInputChange }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "36px",
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Personal Info
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            htmlFor="firstName"
            style={{ fontSize: "15px", fontWeight: 600, color: "#374151" }}
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange(e, "firstName")}
            style={{
              padding: "13px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              color: "#1f2937",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            htmlFor="lastName"
            style={{ fontSize: "15px", fontWeight: 600, color: "#374151" }}
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            style={{
              padding: "13px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "16px",
              color: "#1f2937",
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FormStep1;
