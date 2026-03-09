import { useState, useEffect } from "react";

// Presentational Component - only displays data
function UserList({ users, onUserClick }) {
  return (
    <div>
      <h3>Users ({users.length})</h3>
      {users.length === 0 ? (
        <p style={{ color: "#666" }}>No users found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => onUserClick(user)}
              style={{
                padding: "10px",
                margin: "5px 0",
                background: "#f5f5f5",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Presentational Component - displays selected user
function UserDetails({ user }) {
  if (!user) {
    return <p style={{ color: "#666" }}>Select a user to view details</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        background: "#e3f2fd",
        borderRadius: "8px",
      }}
    >
      <h3>User Details</h3>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
}

// Container Component - handles logic and state
function UserContainer() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "555-0101",
        },
        {
          id: 2,
          name: "Bob Smith",
          email: "bob@example.com",
          phone: "555-0102",
        },
        {
          id: 3,
          name: "Charlie Brown",
          email: "charlie@example.com",
          phone: "555-0103",
        },
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <UserList users={users} onUserClick={handleUserClick} />
      <UserDetails user={selectedUser} />
    </div>
  );
}

function ContainerPresentation() {
  return (
    <div>
      <h2>Container & Presentation Components</h2>
      <UserContainer />
    </div>
  );
}

export default ContainerPresentation;

// Container: handles logic, state, side effects (UserContainer)
// Presentation: displays UI, receives data via props (UserList, UserDetails)
// Separation of concerns: logic vs UI
