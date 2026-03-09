function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

function Props_React() {
  return (
    <div>
      <h1>Props Example</h1>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
      <Greeting name="Charlie" age={35} />
    </div>
  );
}

export default Props_React;

// Props are how you pass data from parent to child components.
// {name} and {age} are destructured from the props object.
// Each <Greeting /> receives different prop values.
