import { useState } from "react";
import { useFormStatus } from "react-dom";

// Reusable submit button component
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <div>
      <button
        type="submit"
        disabled={pending}
        style={{
          padding: "10px 20px",
          backgroundColor: pending ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          cursor: pending ? "not-allowed" : "pointer",
        }}
      >
        {pending ? "Submitting..." : "Submit Form"}
      </button>

      {pending && (
        <div style={{ marginTop: "10px", color: "#666" }}>
          <p>Submitting data...</p>
        </div>
      )}
    </div>
  );
}

// Loading indicator component
function FormLoadingIndicator() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#fff3cd",
        border: "1px solid #ffc107",
        borderRadius: "4px",
        marginBottom: "10px",
      }}
    >
      ⏳ Processing your request...
    </div>
  );
}

// Dynamic field component
function ConditionalField() {
  const { data } = useFormStatus();
  const userType = data?.get("userType");

  if (userType !== "business") return null;

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Company Name:</label>
      <input
        type="text"
        name="companyName"
        style={{ marginLeft: "10px", padding: "5px" }}
      />
    </div>
  );
}

function UseFormStatusHook() {
  const [result, setResult] = useState(null);

  async function handleSubmit(formData) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      userType: formData.get("userType"),
      companyName: formData.get("companyName"),
    };

    setResult(data);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>useFormStatus Hook</h3>
      <p>
        Provides status of parent form. Must be called from inside a form
        component.
      </p>

      <form
        action={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <FormLoadingIndicator />

        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>User Type:</label>
          <select
            name="userType"
            defaultValue="individual"
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>

        <ConditionalField />

        <SubmitButton />
      </form>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#e8f5e9",
            borderRadius: "4px",
          }}
        >
          <h4>Form Submitted:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UseFormStatusHook;
