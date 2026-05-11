import React, { useReducer, useMemo } from 'react'
import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = React.createContext({ 
    items: [], 
    onUpdateItemQuantity: () => {},
    onAddToCart: () => {}
});

const initialState = { items: [] };

function shoppingCartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingCartItemIndex = state.items.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            
            if (existingCartItemIndex > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1,
                };
                return { items: updatedItems };
            }
            
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.id);
            return {
                items: [...state.items, {
                    id: action.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                }]
            };
        }
        
        case 'UPDATE_ITEM_QUANTITY': {
            const updatedItemIndex = state.items.findIndex(
                (item) => item.id === action.productId
            );
            
            const newQuantity = state.items[updatedItemIndex].quantity + action.amount;
            
            if (newQuantity <= 0) {
                return {
                    items: state.items.filter((_, index) => index !== updatedItemIndex)
                };
            }
            
            const updatedItems = [...state.items];
            updatedItems[updatedItemIndex] = {
                ...updatedItems[updatedItemIndex],
                quantity: newQuantity
            };
            return { items: updatedItems };
        }
        case 'CLEAR_CART': {
            return { items: [] };
        }
        default:
            return state;
    }
}

function CartContextProvider({ children }) {
    const [shoppingCartState, dispatchShoppingCart] = useReducer(shoppingCartReducer, initialState);

    // WITH useMemo - Only recreates when shoppingCartState.items changes
    const ctxValue = useMemo(() => ({
        items: shoppingCartState.items,
        onUpdateItemQuantity: (productId, amount) => {
            dispatchShoppingCart({ type: 'UPDATE_ITEM_QUANTITY', productId, amount });
        },
        onAddToCart: (id) => {
            dispatchShoppingCart({ type: 'ADD_ITEM', id });
        },
        clearCart: () => {
            dispatchShoppingCart({ type: 'CLEAR_CART' });
        }
    }), [shoppingCartState.items]); // Only recreate when items actually change

    // WITHOUT useMemo - Creates new object on EVERY render (performance issue)
    // const ctxValue = {
    //     items: shoppingCartState.items,
    //     onUpdateItemQuantity: (productId, amount) => {
    //         dispatchShoppingCart({ type: 'UPDATE_ITEM_QUANTITY', productId, amount });
    //     },
    //     onAddToCart: (id) => {
    //         dispatchShoppingCart({ type: 'ADD_ITEM', id });
    //     },
    //     clearCart: () => {
    //         dispatchShoppingCart({ type: 'CLEAR_CART' });
    //     }
    // };

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;
