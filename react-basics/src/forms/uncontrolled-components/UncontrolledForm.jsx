import { useRef } from "react";

function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const countryRef = useRef(null);
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      country: countryRef.current.value,
      file: fileRef.current.files[0]?.name || "No file selected",
    };

    console.log("Form submitted:", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  const handleReset = () => {
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    countryRef.current.value = "";
    fileRef.current.value = "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Uncontrolled Form Components</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            ref={usernameRef}
            defaultValue=""
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            ref={emailRef}
            defaultValue=""
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
            defaultValue=""
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Country:</label>
          <select
            ref={countryRef}
            defaultValue=""
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="">Select Country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="india">India</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>File:</label>
          <input type="file" ref={fileRef} style={{ marginLeft: "10px" }} />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{ padding: "10px 20px" }}
        >
          Reset
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <p>
          Uncontrolled components use refs to access form values directly from
          the DOM.
        </p>
        <p>Values are only read when needed (like on submit).</p>
      </div>
    </div>
  );
}

export default UncontrolledForm;
