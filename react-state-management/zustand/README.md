# Zustand Cart Demo

This project demonstrates shopping-cart state management in React using **Zustand**.

## Tech Stack

- React 19
- Vite
- Zustand 5

## Project Goal

Show how to move cart state and actions into a lightweight Zustand store, avoiding prop drilling and Context boilerplate.

## State Management Overview

- Zustand store lives in `src/store/cart-store.js`.
- `useCartStore` contains:
  - `items`
  - `addToCart(id)`
  - `updateItemQuantity(productId, amount)`
  - `clearCart()`
- Components subscribe to store state/actions directly through `useCartStore`.

## Main Files

- `src/store/cart-store.js`: centralized cart state + actions
- `src/components/Cart.jsx`: cart line items and quantity updates
- `src/components/Product.jsx`: add-to-cart action
- `src/components/Header.jsx`: cart trigger and summary UI

## Getting Started

Run these commands from this folder (`zustand`):

```bash
npm install
npm run dev
```

## Other Scripts

```bash
npm run build
npm run preview
npm run lint
```

## Notes

- If `npm run dev` fails, check that you are running it from the project root and not from `src`.
