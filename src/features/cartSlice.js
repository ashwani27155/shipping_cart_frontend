// Importing necessary functions and modules
import { createSlice } from "@reduxjs/toolkit";
import productData from "../productData"; // Importing product data
import { fetchProducts, cartData } from "./thunkApi"; // Importing thunk API functions

// Initial state for the cart slice
const initialState = {
	cart: [], // Array to hold items in the cart
	item: [], // Array to hold all available products
	totalQuantity: 0, // Total quantity of items in the cart
	totalPrice: 0, // Total price of items in the cart
};

// Creating a slice for cart management
export const cartSlice = createSlice({
	name: "cart", // Name of the slice
	initialState, // Initial state
	reducers: {}, // No additional reducers defined here
	extraReducers: (builder) => {
		// Extra reducers for handling async actions
		// Reducers for handling fetchProducts thunk
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = "loading"; // Set status to loading while fetching products
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "succeeded"; // Set status to succeeded after successful fetch
				state.item = action.payload; // Set the fetched data to the items array
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "failed"; // Set status to failed if fetching products fails
				state.error = action.error.message; // Store the error message
			});

		// Reducers for handling cartData thunk
		builder
			.addCase(cartData.pending, (state) => {
				state.status = "loading"; // Set status to loading while fetching cart data
			})
			.addCase(cartData.fulfilled, (state, action) => {
				state.status = "succeeded"; // Set status to succeeded after successful fetch
				state.cart = action.payload; // Set the fetched data to the cart array
			})
			.addCase(cartData.rejected, (state, action) => {
				state.status = "failed"; // Set status to failed if fetching cart data fails
				state.error = action.error.message; // Store the error message
			});
	},
});

// Exporting action creators
export const {
	addToCart,
	removeItem,
	increaseItemQuantity,
	decreaseItemQuantity,
} = cartSlice.actions;

// Exporting the reducer function
export default cartSlice.reducer;
