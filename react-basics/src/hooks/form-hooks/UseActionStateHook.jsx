import { useActionState } from "react";

// Server action simulation
async function submitForm(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");

  // Simulate server delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (!name || name.length < 3) {
    return {
      error: "Name must be at least 3 characters",
      success: false,
    };
  }

  if (!email || !email.includes("@")) {
    return {
      error: "Invalid email address",
      success: false,
    };
  }

  return {
    error: null,
    success: true,
    message: `Form submitted successfully for ${name}!`,
  };
}

function UseActionStateHook() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    error: null,
    success: false,
    message: null,
  });

  return (
    <div style={{ padding: "20px" }}>
      <h3>useActionState Hook</h3>
      <p>Handles form actions with pending states and results.</p>

      <form action={formAction} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            style={{ marginLeft: "10px", padding: "5px" }}
            disabled={isPending}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            style={{ marginLeft: "10px", padding: "5px" }}
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "10px 20px",
            backgroundColor: isPending ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>

      {state.error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
          }}
        >
          Error: {state.error}
        </div>
      )}

      {state.success && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: "4px",
          }}
        >
          {state.message}
        </div>
      )}
    </div>
  );
}

export default UseActionStateHook;
