import { CartProvider } from "./CartProvider";
import ProductList from "./ProductList";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

function ContextAPI_React() {
  return (
    <CartProvider>
      <div>
        <h1>Context API with useReducer</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div>
            <ProductList />
          </div>
          <div>
            <h2>Shopping Cart</h2>
            <CartItems />
            <CartSummary />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default ContextAPI_React;

// Real-world pattern: Context + useReducer for global state management.
// Separate files: Context, Reducer, Provider, Custom Hook, Consumer Components.
// This structure scales well for larger applications.
