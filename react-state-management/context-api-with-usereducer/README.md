# Context API + useReducer Cart Demo

This project demonstrates shopping-cart state management in React using **Context API** with **useReducer**.

## Tech Stack

- React 19
- Vite
- Context API
- useReducer

## Project Goal

Show how to centralize cart logic with a reducer and expose actions through a context provider.

## State Management Overview

- `CartContext` is created in `src/components/CartCotextProvider.jsx`.
- `shoppingCartReducer` handles actions:
  - `ADD_ITEM`
  - `UPDATE_ITEM_QUANTITY`
  - `CLEAR_CART`
- The provider memoizes context value with `useMemo` to avoid unnecessary re-renders.

## Main Files

- `src/components/CartCotextProvider.jsx`: reducer, context, provider
- `src/components/Cart.jsx`: cart line items and quantity updates
- `src/components/Product.jsx`: add-to-cart action
- `src/components/Header.jsx`: cart trigger and summary UI

## Getting Started

Run these commands from this folder (`context-api-with-usereducer`):

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

- If `npm run dev` fails, confirm your terminal is in the project root (not inside `src`).
- File name `CartCotextProvider.jsx` contains a typo in "Cotext" but is referenced consistently in the app.
