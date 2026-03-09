import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h2>About Page</h2>
      <p>This is the about page demonstrating React Router.</p>
      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: "10px" }}>
        Go Back
      </button>
    </div>
  );
}

export default About;
