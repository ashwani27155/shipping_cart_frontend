import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from React Redux
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from React Router
import Axios_APIS from "../utils/axios.config";
import { cartData, fetchProducts } from "../features/thunkApi"; // Importing thunk action creators for fetching products and cart data
import axios from "axios"; // Importing Axios for making HTTP requests

const ProductCard = () => {
	const navigate = useNavigate(); // Function for navigating to different routes
	const itemData = useSelector((state) => state.allCarts.item); // Selector for accessing product data from Redux store
	const { cart } = useSelector((state) => state.allCarts); // Selector for accessing cart data from Redux store

	const dispatch = useDispatch(); // Redux dispatch function

	// Function to handle product click event and navigate to the product details page
	const handleProductClick = (id) => {
		navigate(`/product/${id}`);
	};

	// Array to store IDs of products in the cart
	let cartId = [];
	cart.forEach((element) => {
		cartId.push(element?.productId);
	});

	// Function to handle add to cart click event
	const handleAddToCartClick = async (item) => {
		try {
			// Making a POST request to add the product to the cart
			const response = await Axios_APIS().post("/addToCart", {
				productId: item?._id,
				quantity: [item].length,
			});

			// Dispatching cartData action to update cart data
			if (response?.status === 200) {
				dispatch(cartData());
			}
		} catch (error) {
			console.log(error, "error");
		}
	};

	// Effect hook to fetch products upon component mounting
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	// Rendering JSX for the product card grid
	return (
		<div className="mt-[80px] container">
			<div className="flex justify-end">
				{/* Link to navigate to the "Upload Product" page */}
				<Link
					to="/uploadproduct"
					className="navbar-brand border p-2 bg-gray-500 text-white font-bold rounded-[10px] hover:bg-gray-800"
				>
					Add new Product
				</Link>
			</div>

			<div className="grid grid-cols-4 my-2">
				{/* Mapping through product data and rendering product cards */}
				{itemData &&
					itemData.map((item) => (
						<div
							key={item._id}
							className="card my-2 transition-[0.3s] hover:scale-110 overflow-hidden"
							style={{
								width: "18rem",
								display: "flex",
								textAlign: "center",
								justifyContent: "space-around",
								cursor: "pointer",
							}}
							onClick={() => handleProductClick(item._id)}
						>
							<img
								className="card-img-top h-[300px] w-[300px] "
								src={
									isValidUrl(item.image)
										? item.image
										: `http://localhost:8081/${item.image}`
								}
								alt="Card image cap"
							/>

							<div className="card-body">
								<h5 className="card-title">{item.productName}</h5>
								<p className="card-text">{item.description}</p>
								<p className="card-text my-[10px]">Price: ${item.price}</p>
								{/* Conditional rendering for adding to cart button */}
								{cartId?.includes(item?._id) ? (
									<span className="border p-2 rounded !mt-[60px] text-[red]">
										"Product already in cart"
									</span>
								) : (
									<a
										onClick={(e) => {
											e.stopPropagation();
											handleAddToCartClick(item);
										}}
										className="btn btn-primary"
									>
										Add to cart
									</a>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

// Function to check if a URL is valid
function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
}

// Exporting the ProductCard component as the default export
export default ProductCard;
