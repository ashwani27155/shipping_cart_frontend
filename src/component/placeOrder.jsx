import React, { useEffect } from "react"; // Importing React and useEffect hook
import { useDispatch } from "react-redux"; // Importing useDispatch hook from React Redux
import { deleteCart } from "../features/thunkApi"; // Importing deleteCart thunk action creator


const Placeorder = () => {
	const dispatch = useDispatch(); // Redux dispatch function

	// Effect hook to delete cart data upon component mounting
	useEffect(() => {
		// Dispatching deleteCart action to delete cart data
		dispatch(deleteCart());
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
			<h1>Order has been successfully placed</h1>
		</div>
	);
};

// Exporting the Placeorder component as the default export
export default Placeorder;
