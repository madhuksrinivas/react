import { useState } from "react";

// Simulate a profile component
function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #FF9800",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: "#FF9800" }}>👤 Profile Component</h3>
      <div style={{ marginTop: "15px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>Name:</strong> John Doe
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> john.doe@example.com
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Role:</strong> Developer
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
        {isEditing && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#fff3e0",
              borderRadius: "4px",
            }}
          >
            <p>Edit mode activated! (Form would go here)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
