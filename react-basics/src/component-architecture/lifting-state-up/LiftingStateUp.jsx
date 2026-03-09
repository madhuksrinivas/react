import { useState } from "react";

// Child component
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label>
        Enter temperature in {scale === "c" ? "Celsius" : "Fahrenheit"}:
        <input
          type="number"
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px", width: "100px" }}
        />
      </label>
    </div>
  );
}

// Child component
function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return (
      <p style={{ color: "red", fontWeight: "bold" }}>
        The water would boil! 🔥
      </p>
    );
  }
  return <p style={{ color: "blue" }}>The water would not boil. ❄️</p>;
}

// Helper functions
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 100) / 100;
  return rounded.toString();
}

// Parent component - state is "lifted up" here
function LiftingStateUp() {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  const handleCelsiusChange = (temp) => {
    setScale("c");
    setTemperature(temp);
  };

  const handleFahrenheitChange = (temp) => {
    setScale("f");
    setTemperature(temp);
  };

  const celsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <h2>Lifting State Up</h2>
      <p>Enter temperature in either field - both will sync automatically</p>

      <div
        style={{
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange}
        />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange}
        />

        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>

      <div style={{ fontSize: "12px", color: "#666" }}>
        <p>💡 The state lives in the parent component</p>
        <p>💡 Both inputs stay in sync because they share the same state</p>
      </div>
    </div>
  );
}

export default LiftingStateUp;

// Lifting state up: move shared state to the closest common ancestor
// Parent manages state, children receive props and callbacks
// Keeps components in sync
