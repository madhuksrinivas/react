import { useParams, useNavigate } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = {
    1: { name: "John Doe", email: "john@example.com", role: "Admin" },
    2: { name: "Jane Smith", email: "jane@example.com", role: "User" },
    3: { name: "Bob Johnson", email: "bob@example.com", role: "User" },
  };

  const user = users[id];

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>User Not Found</h2>
        <button onClick={() => navigate("/users")}>Back to Users</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>
      <p>ID: {id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={() => navigate("/users")}>Back to Users</button>
    </div>
  );
}

export default UserDetail;
