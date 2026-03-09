import { createContext } from "react";

const defaultValue = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
  clearCart: () => {},
  getTotalItems: () => {},
  getTotalPrice: () => {},
};

export const CartContext = createContext(defaultValue);
