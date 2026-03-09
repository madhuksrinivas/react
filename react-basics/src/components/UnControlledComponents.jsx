import { useRef } from "react";

function UnControlledComponents() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const submittedDataRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    // Display submitted data
    submittedDataRef.current.innerHTML = `
      <h3>Submitted Data:</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `;

    // Show the result box
    submittedDataRef.current.style.display = "block";

    // Reset form
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };

  const focusName = () => {
    nameRef.current.focus();
  };

  return (
    <div>
      <h2>Uncontrolled Components</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              ref={nameRef}
              defaultValue=""
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              ref={emailRef}
              defaultValue=""
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Message:
            <textarea
              ref={messageRef}
              defaultValue=""
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={focusName}
          style={{ marginLeft: "10px" }}
        >
          Focus Name Input
        </button>
      </form>

      <div
        ref={submittedDataRef}
        style={{
          padding: "15px",
          background: "#ffe0e0",
          borderRadius: "5px",
          display: "none",
        }}
      />
    </div>
  );
}

export default UnControlledComponents;

// Uncontrolled components: DOM is the source of truth
// Use refs to access input values when needed
// No state updates on every keystroke
// Useful for simple forms or integrating with non-React code
