import { createSlice, PayloadAction, createListenerMiddleware, createSelector } from '@reduxjs/toolkit'
import { stat } from 'fs'
import type { RootState } from './store'
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth } from "../firebase/firebaseApp";
import { db } from "../firebase/firebaseApp";
import { fetchCartApi, fetchCartLocal } from './middleware/cartThunk';


// Define a type for the slice state

interface cartItem {
    id: string
    quantity: number
}

interface cartState {
    cartItems: cartItem[],
    total: number,
    isOpen: boolean,


}

// Define the initial state using that type
const initialState: cartState = {
    cartItems: [],
    total: 0,
    isOpen: false,

}



export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        openCart: (state) => {
            console.log(state.isOpen);
            state.isOpen = true;
        },
        closeCart: (state) => {
            console.log(state.isOpen);
            state.isOpen = false
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {

            if (state.cartItems.find(item => item.id === action.payload) == null) {
                state.cartItems = [...state.cartItems, { id: action.payload, quantity: 1 }];

            } else {
                state.cartItems = state.cartItems.map(item => {
                    if (item.id === action.payload) return { id: item.id, quantity: item.quantity + 1 }
                    return item;
                })
            }



        },

        // Use the PayloadAction type to declare the contents of `action.payload`
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {

            if (state.cartItems.find(item => item.id === action.payload)?.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
            } else {
                state.cartItems.map(item => {
                    if (item.id === action.payload) return { ...item, quantity: item.quantity - 1 }
                    else
                        return item
                })
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchCartApi.fulfilled, (state, action: any) => {
            let payload = action.payload.items;
            // @ts-ignore: Object is possibly 'null'.
            let localItems = JSON.parse(localStorage.getItem('cart-items'));
            const user = action.payload.user;
            //console.log(user)
            if (!localItems) {

                localItems = localStorage.setItem('cart-items', JSON.stringify(payload))

            } else {
                payload.forEach((item: cartItem) => {
                    if (!localItems.find((itemLocal: cartItem) => itemLocal.id === item.id)) {
                        localItems.push(item)
                        localStorage.setItem('cart-items', JSON.stringify(localItems))
                    }
                });

                localItems.forEach((item: cartItem) => {
                    if (!payload.find((itemPayload: cartItem) => itemPayload.id === item.id)) {
                        payload.push(item);
                        (async () => {
                            const req = await setDoc(doc(db, "cart", user), { ...payload });
                        })()

                    }
                });
            }
            state.cartItems = payload
        }).addCase(fetchCartApi.rejected, (state, action: any) => {
            // @ts-ignore: Object is possibly 'null'.
            let localItems = JSON.parse(localStorage.getItem('cart-items'));
            const user = action.payload;
            //  console.log("USER: ", user);
            if (localItems) {
                (async () => {
                    const req = await setDoc(doc(db, "cart", user), { ...localItems });

                })()
                state.cartItems = localItems
            }
        }).addCase(fetchCartLocal.fulfilled, (state, action: any) => {

            state.cartItems = action.payload
        })
    }
})

export const { increaseItemQuantity, decreaseItemQuantity, removeFromCart, openCart, closeCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.cartItems
export const selectIsOpen = (state: RootState) => state.cart.isOpen
export const cartTotal = createSelector(selectCartItems, (cartItems) => cartItems.length)


export default cartSlice.reducer