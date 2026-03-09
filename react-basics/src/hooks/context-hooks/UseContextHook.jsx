import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
      }}
    >
      Current theme: {theme}
    </button>
  );
}

function UseContextHook() {
  return (
    <ThemeProvider>
      <div>
        <h2>useContext Example</h2>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

export default UseContextHook;

// useContext reads value from the nearest Provider above in the tree.
// No need for prop drilling - any component can access context.
// Context updates trigger re-renders in consuming components.
