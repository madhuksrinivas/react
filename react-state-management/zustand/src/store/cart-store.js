import { create } from "zustand";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const useCartStore = create((set) => ({
  items: [],
  addToCart: (id) => {
    set((state) => {
      const existingCartItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === id,
      );

      if (existingCartItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = {
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity + 1,
        };
        return { items: updatedItems };
      }

      const product = DUMMY_PRODUCTS.find((product) => product.id === id);
      return {
        items: [
          ...state.items,
          {
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      };
    });
  },
  updateItemQuantity: (productId, amount) => {
    set((state) => {
      const updatedItemIndex = state.items.findIndex(
        (item) => item.id === productId,
      );

      const newQuantity = state.items[updatedItemIndex].quantity + amount;

      if (newQuantity <= 0) {
        return {
          items: state.items.filter((_, index) => index !== updatedItemIndex),
        };
      }

      const updatedItems = [...state.items];
      updatedItems[updatedItemIndex] = {
        ...updatedItems[updatedItemIndex],
        quantity: newQuantity,
      };
      return { items: updatedItems };
    });
  },
  clearCart: () => {
    set({ items: [] });
  },
}));
