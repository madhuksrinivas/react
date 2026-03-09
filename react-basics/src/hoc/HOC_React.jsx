import { useState } from "react";

// Higher Order Component that adds loading functionality
function withLoading(Component) {
  return function WithLoadingComponent(props) {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Component {...props} setLoading={setIsLoading} />
        )}
      </div>
    );
  };
}

// Regular component
function UserProfile({ name, setLoading }) {
  const loadData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <h3>User: {name}</h3>
      <button onClick={loadData}>Load Data</button>
    </div>
  );
}

// Enhanced component with HOC
const UserProfileWithLoading = withLoading(UserProfile);

function HOC_React() {
  return (
    <div>
      <h1>Higher Order Component Example</h1>
      <UserProfileWithLoading name="Alice" />
    </div>
  );
}

export default HOC_React;

// HOC is a function that takes a component and returns a new component.
// It adds extra functionality without modifying the original component.
// Common pattern before hooks - now often replaced by custom hooks.
