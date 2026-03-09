import { useCart } from "./useCart";

function CartSummary() {
  const { getTotalItems, getTotalPrice, clearCart, items } = useCart();

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        background: "#f5f5f5",
        borderRadius: "5px",
      }}
    >
      <h3>Cart Summary</h3>
      <p>Total Items: {getTotalItems()}</p>
      <p>
        <strong>Total Price: ${getTotalPrice().toFixed(2)}</strong>
      </p>
      {items.length > 0 && (
        <button
          onClick={clearCart}
          style={{
            marginTop: "10px",
            background: "#ff4444",
            color: "white",
            border: "none",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default CartSummary;
