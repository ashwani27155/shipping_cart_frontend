import { createAsyncThunk } from "@reduxjs/toolkit"; // Importing createAsyncThunk function from Redux Toolkit
import axios from "axios"; // Importing Axios for making HTTP requests

export const fetchProducts = createAsyncThunk("/fetch_product", async () => {
	try {
		// Making a GET request to fetch products from the server
		const response = await axios.get("http://localhost:8081/listProduct");
		// Logging the response data for debugging purposes
		console.log("response==", response?.data?.data);
		// Returning the fetched products data
		return response?.data?.data;
	} catch (error) {
		// Logging and handling errors if any occur during the request
		console.log(error, "ppp");
	}
});

export const cartData = createAsyncThunk("/get_cart", async () => {
	try {
		// Making a GET request to fetch cart data from the server
		const response = await axios.get("http://localhost:8081/getCart");
		// Logging the response data for debugging purposes
		console.log(
			"response==12345",
			response?.data?.data.cartDataWithTotalQuantity
		);
		// Returning the fetched cart data
		return response?.data?.data.cartDataWithTotalQuantity;
	} catch (error) {
		// Logging and handling errors if any occur during the request
		console.log(error);
	}
});

export const deleteCart = createAsyncThunk("/delete_cart", async () => {
	try {
		// Making a DELETE request to delete cart data from the server
		const response = await axios.delete("http://localhost:8081/clearCart");
		// Returning the response object from the server
		return response;
	} catch (error) {
		// Logging and handling errors if any occur during the request
		console.log(error);
	}
});

export const increasecartqnt = createAsyncThunk("/increase_cart", async () => {
	try {
		// Making a POST request to increase the quantity of items in the cart on the server
		const response = await axios.post("http://localhost:8081/increaseCartQnt");
		// Returning the response object from the server
		return response;
	} catch (error) {
		// Logging and handling errors if any occur during the request
		console.log(error);
	}
});

export const decreasecartqnt = createAsyncThunk("/increase_cart", async () => {
	try {
		// Making a POST request to decrease the quantity of items in the cart on the server
		const response = await axios.post("http://localhost:8081/decreaseCartQnt");
		// Returning the response object from the server
		return response;
	} catch (error) {
		// Logging and handling errors if any occur during the request
		console.log(error);
	}
});
