// Importing necessary functions and modules
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

// Creating Redux store with cartReducer as the reducer
export const store = configureStore({
	reducer: { allCarts: cartReducer }, // Configuring store with cartReducer
});
