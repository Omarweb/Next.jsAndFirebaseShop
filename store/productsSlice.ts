import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state

interface products {
    id: string,
    title: string,
    price: number,
    image: string,
}



// Define the initial state using that type
const initialState: products[] = {}

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.cartItems

export default cartSlice.reducer