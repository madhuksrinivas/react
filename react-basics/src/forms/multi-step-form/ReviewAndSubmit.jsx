import React from "react";

function ReviewAndSubmit({ formData, handleSubmit }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "36px",
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px",
          fontSize: "20px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Review &amp; Submit
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "28px",
        }}
      >
        {formData.firstName && (
          <p style={{ margin: 0, fontSize: "16px", color: "#374151" }}>
            <span style={{ fontWeight: 600 }}>First Name:</span>{" "}
            {formData.firstName}
          </p>
        )}
        {formData.lastName && (
          <p style={{ margin: 0, fontSize: "16px", color: "#374151" }}>
            <span style={{ fontWeight: 600 }}>Last Name:</span>{" "}
            {formData.lastName}
          </p>
        )}
        {formData.email && (
          <p style={{ margin: 0, fontSize: "16px", color: "#374151" }}>
            <span style={{ fontWeight: 600 }}>Email:</span> {formData.email}
          </p>
        )}
        {formData.phone && (
          <p style={{ margin: 0, fontSize: "16px", color: "#374151" }}>
            <span style={{ fontWeight: 600 }}>Phone:</span> {formData.phone}
          </p>
        )}
        {formData.comments && (
          <p style={{ margin: 0, fontSize: "16px", color: "#374151" }}>
            <span style={{ fontWeight: 600 }}>Comments:</span>{" "}
            {formData.comments}
          </p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "13px 32px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default ReviewAndSubmit;
