
import { createAsyncThunk } from '@reduxjs/toolkit'
import { db, auth } from '../../firebase/firebaseApp';
import { doc, getDoc, setDoc } from "firebase/firestore";


export const fetchCartApi = createAsyncThunk(
    'cart/fetchCartApiStatus',
    async (user: string, { rejectWithValue }) => {
        // const serializedState = JSON.parse(localStorage.getItem('cart-items'));
        // if (serializedState && serializedState.length >= 0) await setDoc(doc(db, "cart", user), { ...serializedState })
        try {
            const docRef = doc(db, "cart", user);
            const data = await getDoc(docRef);
            // @ts-ignore: Object is possibly 'null'.
            const items = Object.values(data.data());

            return { items, user };
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(user)
        }
    });

export const fetchCartLocal = createAsyncThunk(
    'cart/fetchCartLocalStatus',
    () => {
        const serializedState = localStorage.getItem('cart-items');
        if (!serializedState) return [];
        return JSON.parse(serializedState);

    });






