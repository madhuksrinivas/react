const items = ["Apple", "Banana", "Cherry"];

function JSX_React() {
  return (
    <div>
      <h1>My Fruit List</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default JSX_React;

// The <div>, <h1>, and <ul> look like HTML, but they’re JSX.
// {items.map(...)} shows how JavaScript expressions can be embedded inside JSX.
