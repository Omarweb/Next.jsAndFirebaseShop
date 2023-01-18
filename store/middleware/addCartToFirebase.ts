import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from '../../firebase/firebaseApp';
import { increaseItemQuantity, decreaseItemQuantity, removeFromCart } from '../cartSlice';
import { AnyAction } from 'redux'
import { MiddlewareAPI } from '@reduxjs/toolkit';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(increaseItemQuantity, decreaseItemQuantity, removeFromCart),
    effect: async (action: AnyAction, listenerApi: MiddlewareAPI) => {
        console.log("ACTION: ", action)
        const user = auth.currentUser;
        const items = listenerApi.getState().cart.cartItems;
        localStorage.setItem('cart-items', JSON.stringify(items))

        if (user !== null) {
            // @ts-ignore: Object is possibly 'null'.
            const document = doc(db, "cart", user.email);
            await setDoc(document, { ...items });
        }
        // console.log('Cart: ', items)
    }
})


