import React, { useEffect } from "react"; // Importing React and useEffect hook
import { useDispatch } from "react-redux"; // Importing useDispatch hook from React Redux
import { cartData } from "../features/thunkApi"; // Importing deleteCart thunk action creator
import { Link } from "react-router-dom";

const Placeorder = () => {
	const dispatch = useDispatch(); // Redux dispatch function

	// Effect hook to delete cart data upon component mounting
	useEffect(() => {
		// Dispatching deleteCart action to delete cart data
		// dispatch(deleteCart());
		dispatch(cartData());
	}, [dispatch]); // Dependency array to ensure the effect runs only once after mounting

	// Rendering JSX for the "Place Order" page
	return (
		<div
			style={{
				marginTop: "100px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "calc(100vh - 100px)",
			}}
		>
			<div className="flex flex-col gap-3">
				<h1>Order has been successfully placed</h1>
				<Link
					to="/"
					className="bg-blue-200 border flex justify-center w-[100%] inline-block p-2 rounded hover:bg-blue-500 hover:text-white "
				>
					Home Page
				</Link>
			</div>
		</div>
	);
};

// Exporting the Placeorder component as the default export
export default Placeorder;
