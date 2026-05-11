import React, { useRef, useState } from 'react';
import CartModal from './CartModal.jsx';
import SuccessModal from './SuccessModal.jsx';
import {CartContext} from './CartCotextProvider.jsx';

export default function Header() {
  const cartModal = useRef();
  const successModal = useRef();
  const cartctx = React.useContext(CartContext);
  const cartQuantity = cartctx.items.length;

  function handleOpenCartClick() {
    cartModal.current.open();
  }

  function handleCheckout() {
    cartModal.current.close();
    successModal.current.open();
    cartctx.clearCart();
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
      <CartModal
        ref={cartModal}
        title="Your Cart"
        actions={modalActions}
      />
      
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
