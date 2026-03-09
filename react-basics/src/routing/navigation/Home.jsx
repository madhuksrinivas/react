import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Home Page</h2>
      <p>Welcome to React Routing Demo</p>
      <ul>
        <li>
          <Link to="/about">Go to About</Link>
        </li>
        <li>
          <Link to="/contact">Go to Contact</Link>
        </li>
        <li>
          <Link to="/users">Go to Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
