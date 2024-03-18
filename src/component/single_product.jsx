import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from React Redux
import { useNavigate, useParams } from "react-router-dom"; // Importing useNavigate and useParams hooks from React Router

import { addToCart } from "../features/cartSlice"; // Importing addToCart action creator from cartSlice
import axios from "axios"; // Importing Axios for making HTTP requests
import { cartData } from "../features/thunkApi"; // Importing cartData thunk action creator
import Axios_APIS from "../utils/axios.config";
import { BaseURL } from "../utils/baseUrl";

const Single_product = () => {
	const { cart } = useSelector((state) => state.allCarts); // Selector for accessing cart data from Redux store

	// Extracting parameters from the URL
	const { id } = useParams();
	const navigate = useNavigate(); // Function for navigating to different routes
	const [data, setdata] = useState(); // State variable to hold data of the single product
	console.log("data==", data);
	// Function to fetch data of the single product from the server
	const get_single_data = async () => {
		try {
			const response = await Axios_APIS.get(`/get_Product_Id?id=${id}`);

			if (response?.status === 200) {
				setdata(response?.data?.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Dispatch function from React Redux
	const dispatch = useDispatch();
	// Array to store IDs of products in the cart
	let cartId = [];
	cart.forEach((element) => {
		cartId.push(element?.productId);
	});
	// Function to add the product to the cart
	const add_to_cart = async (id) => {
		try {
			const response = await Axios_APIS.post("/addToCart", {
				productId: id,
				quantity: 1,
			});

			if (response?.status === 200) {
				// Dispatching cartData action to update cart data
				dispatch(cartData());
			}
		} catch (error) {
			console.log(error, "error");
		}
	};

	// Effect hook to fetch data of the single product and update cart data upon component mounting
	useEffect(() => {
		get_single_data();
		dispatch(cartData()); // Fetching cart data upon mounting
	}, [dispatch]);

	// Rendering JSX for the single product details page
	return (
		<div className="!mt-[60px]">
			<div className="my-2">
				<h1>Product Details page</h1>
			</div>
			<div className=" flex justify-center  shadow-[rgba(0,0,0,0.35)_0px_5px_15px] ">
				<div className="w-[50%] border flex justify-center p-3 ">
					<img
						className=" max-w-[500px]"
						src={
							isValidUrl(data?.image)
								? data?.image
								: `${BaseURL}/${data?.image}`
						}
						alt="Card image cap"
					/>
				</div>

				<div className="w-[50%] flex justify-center items-center ">
					<div className="my-2">
						<h5 className="card-title">{data?.productName}</h5>
						<p className="card-text">{data?.description}</p>
						<p className="card-text">Price: ${data?.price}</p>
						<div className="my-3">
							{/* Conditional rendering for adding to cart button */}
							{cartId.length > 0 && cartId.includes(data?._id) ? (
								<span className="border p-2 rounded !mt-[60px] text-[red]">
									"Product already in cart"
								</span>
							) : (
								<a
									onClick={() => add_to_cart(data?._id)}
									className="btn btn-primary"
								>
									Add to cart
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
}
export default Single_product;
