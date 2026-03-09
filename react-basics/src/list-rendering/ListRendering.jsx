const users = [
  { id: 1, name: "Alice", role: "Developer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Manager" },
];

function ListRendering_React() {
  return (
    <div>
      <h1>List Rendering</h1>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListRendering_React;

// .map() transforms each item in the array into a React element.
// key={user.id} helps React identify which items changed, added, or removed.
// Always use a unique, stable value as key (like id), not array index.
