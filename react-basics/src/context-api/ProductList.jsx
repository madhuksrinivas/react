import { useCart } from "./useCart";

const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 29 },
  { id: 3, name: "Keyboard", price: 79 },
];

function ProductList() {
  const { addItem } = useCart();

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Products</h2>
      <div>
        {products.map((product) => (
          <div
            key={product.id}
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
              <strong>{product.name}</strong> - ${product.price}
            </div>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
