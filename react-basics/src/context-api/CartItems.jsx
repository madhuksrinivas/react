import { useCart } from "./useCart";

function CartItems() {
  const { items, incrementItem, decrementItem, removeItem } = useCart();

  if (items.length === 0) {
    return <p style={{ color: "#666" }}>Your cart is empty</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{item.name}</strong> - ${item.price}
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={() => decrementItem(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => incrementItem(item.id)}>+</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
