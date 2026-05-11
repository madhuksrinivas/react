import React, { useRef, useState } from "react";
import CartModal from "./CartModal.jsx";
import SuccessModal from "./SuccessModal.jsx";
import { useCartStore } from "../store/cart-store.js";

export default function Header() {
  const cartModal = useRef();
  const successModal = useRef();
  const clearCart = useCartStore((state) => state.clearCart);
  const cartQuantity = useCartStore((state) => state.items.length);

  function handleOpenCartClick() {
    cartModal.current.open();
  }

  function handleCheckout() {
    cartModal.current.close();
    successModal.current.open();
    clearCart();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button onClick={handleCheckout}>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={cartModal} title="Your Cart" actions={modalActions} />

      <SuccessModal
        ref={successModal}
        title="Success!"
        message="Order placed successfully!"
        actions={<button>Close</button>}
      />

      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
