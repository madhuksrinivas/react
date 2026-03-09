import { useState } from "react";

function InputHandling() {
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [uppercaseInput, setUppercaseInput] = useState("");
  const [trimmedInput, setTrimmedInput] = useState("");
  const [maskedInput, setMaskedInput] = useState("");
  const [debounceInput, setDebounceInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // Handle uppercase transformation
  const handleUppercase = (e) => {
    setUppercaseInput(e.target.value.toUpperCase());
  };

  // Handle number input (only digits)
  const handleNumberOnly = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumberInput(value);
  };

  // Handle trimmed input (on blur)
  const handleTrim = (e) => {
    setTrimmedInput(e.target.value.trim());
  };

  // Handle phone number masking
  const handlePhoneMask = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);

    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }

    setMaskedInput(value);
  };

  // Handle debounce (simulate API call)
  const handleDebounce = (e) => {
    const value = e.target.value;
    setDebounceInput(value);

    // Clear previous timeout
    clearTimeout(window.debounceTimer);

    // Set new timeout
    window.debounceTimer = setTimeout(() => {
      setDebouncedValue(value);
      console.log("API call with:", value);
    }, 500);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Input Handling Patterns</h3>

      <div style={{ marginBottom: "20px" }}>
        <h4>1. Basic Text Input</h4>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type anything"
          style={{ padding: "5px", width: "300px" }}
        />
        <p>Value: {textInput}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>2. Numbers Only</h4>
        <input
          type="text"
          value={numberInput}
          onChange={handleNumberOnly}
          placeholder="Numbers only"
          style={{ padding: "5px", width: "300px" }}
        />
        <p>Value: {numberInput}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>3. Auto Uppercase</h4>
        <input
          type="text"
          value={uppercaseInput}
          onChange={handleUppercase}
          placeholder="Converts to uppercase"
          style={{ padding: "5px", width: "300px" }}
        />
        <p>Value: {uppercaseInput}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>4. Trim on Blur</h4>
        <input
          type="text"
          value={trimmedInput}
          onChange={(e) => setTrimmedInput(e.target.value)}
          onBlur={handleTrim}
          placeholder="Spaces removed on blur"
          style={{ padding: "5px", width: "300px" }}
        />
        <p>Value: "{trimmedInput}"</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>5. Phone Number Mask</h4>
        <input
          type="text"
          value={maskedInput}
          onChange={handlePhoneMask}
          placeholder="(123) 456-7890"
          style={{ padding: "5px", width: "300px" }}
        />
        <p>Value: {maskedInput}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>6. Debounced Input (500ms)</h4>
        <input
          type="text"
          value={debounceInput}
          onChange={handleDebounce}
          placeholder="Type to search..."
          style={{ padding: "5px", width: "300px" }}
        />
        <p>Current: {debounceInput}</p>
        <p>Debounced (API value): {debouncedValue}</p>
      </div>

      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          marginTop: "20px",
        }}
      >
        <h4>Input Handling Techniques:</h4>
        <ul>
          <li>Basic: Direct state update</li>
          <li>Transform: Modify value before setting (uppercase, lowercase)</li>
          <li>Filter: Remove unwanted characters (numbers only)</li>
          <li>Trim: Remove whitespace on blur</li>
          <li>Mask: Format while typing (phone, credit card)</li>
          <li>Debounce: Delay action until user stops typing</li>
        </ul>
      </div>
    </div>
  );
}

export default InputHandling;
