import React from "react";
import { useCartStore } from "../store/cart-store";

export default function Product({ id, image, title, price, description }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
