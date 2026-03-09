import { useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialState } from "./cartReducer";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const incrementItem = (id) => {
    dispatch({ type: "INCREMENT", payload: id });
  };

  const decrementItem = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const value = {
    items: state.items,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
