import React, { useState } from "react"; // Importing React and useState hook
import axios from "axios"; // Importing Axios for making HTTP requests
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Axios_APIS from "../utils/axios.config";

const Uploadproduct = () => {
	// State to hold form data
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		productName: "",
		price: "",
		description: "",
		image: null,
	});

	const { productName, price, description, image } = formData;

	// Function to handle input change in the form
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "image") {
			setFormData({
				...formData,
				[name]: e.target.files[0], // Capture the file object
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	// Function to handle form submission
	const formSubmitHandler = async (event) => {
		event.preventDefault();
		// Check if productName or price is empty
		if (!productName.trim() || !price.trim()) {
			toast.error("Product Name and Price are required");
			return;
		}

		try {
			// Creating a new FormData object to append form data including the image file
			const formDataWithImage = new FormData();
			formDataWithImage.append("productName", productName);
			formDataWithImage.append("price", price);
			formDataWithImage.append("description", description);
			formDataWithImage.append("image", image); // Append the file object directly

			// Making a POST request to add the product with form data including the image file
			const response = await Axios_APIS.post("/addProduct", formDataWithImage, {
				headers: {
					"Content-Type": "multipart/form-data", // Set content type to multipart/form-data
				},
			});

			if (response?.status === 200) {
				toast.success("Product addded successfully");
				navigate("/");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	// Rendering JSX for the upload product form
	return (
		<form onSubmit={formSubmitHandler} className="mx-5  mt-[80px]">
			<h1 className="text-black font-bold my-3 ">Add Product page</h1>
			<div className="form-group">
				<label htmlFor="productName">Product Name*</label>
				<input
					type="text"
					className="form-control"
					id="productName"
					name="productName"
					value={productName}
					onChange={handleChange}
					placeholder="Enter Product name"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="price">Price*</label>
				<input
					type="number"
					className="form-control"
					id="price"
					name="price"
					value={price}
					onChange={handleChange}
					placeholder="Enter Price"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="image">Image</label>
				<input
					type="file"
					className="form-control"
					id="image"
					name="image"
					onChange={handleChange}
					placeholder="Upload Product image"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="description">Product Description</label>
				<textarea
					className="form-control"
					id="description"
					name="description"
					value={description}
					onChange={handleChange}
					rows="3"
					placeholder="Enter Product description"
				></textarea>
			</div>
			<button
				type="submit"
				className="btn btn-primary !bg-blue-500 text-white mt-3"
			>
				Submit
			</button>
		</form>
	);
};

// Exporting the Uploadproduct component as the default export
export default Uploadproduct;
