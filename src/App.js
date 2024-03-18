import React from "react"; // Importing React library
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importing BrowserRouter, Route, and Routes components from React Router
import ProductCard from "./component/productComponent"; // Importing ProductCard component
import Navbar from "./component/navbar"; // Importing Navbar component
import Cart from "./component/cartPage"; // Importing Cart component
import  Single_product  from "./component/single_product"; // Importing Single_product component
import Placeorder from "./component/placeOrder"; // Importing Placeorder component
import Uploadproduct from "./component/uploadProduct"; // Importing Uploadproduct component

import { ToastContainer, toast } from 'react-toastify';
function App() {
	return (
		<div className="">
			<ToastContainer/>
			{/* Setting up BrowserRouter for routing */}
			<BrowserRouter>
				<div className="w-[1040px] mx-auto">
					{/* Rendering Navbar component */}
					<Navbar />
				</div>

				{/* Defining routes for different pages */}
				<Routes>
					<Route exact path="/" element={<ProductCard />} />{" "}
					{/* Route for the home page */}
					<Route path="/cart" element={<Cart />} />{" "}
					{/* Route for the cart page */}
					<Route path="/product/:id" element={<Single_product />} />{" "}
					{/* Route for the single product page */}
					<Route path="/placeorder" element={<Placeorder />} />{" "}
					{/* Route for the place order page */}
					<Route path="/uploadproduct" element={<Uploadproduct />} />{" "}
					{/* Route for the upload product page */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

// Exporting the App component as the default export
export default App;
