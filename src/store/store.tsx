import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './cartSlice/cartSlice'
import productReducer from './productSlice/productSlice'
import authReducer from "./authSlice/authSlice"
// import { cartLocalStorageMiddleware } from "./cartMiddleware/cartMiddleware";

const store = configureStore({
    reducer:{
        cart :cartReducer,
        product :productReducer,
        auth : authReducer
    },
    // middleware:(getDefaultMiddleware)=>
    //     getDefaultMiddleware().concat(cartLocalStorageMiddleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch  = typeof store.dispatch
export default store
