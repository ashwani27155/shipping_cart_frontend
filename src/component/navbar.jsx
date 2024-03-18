import React, { useEffect } from "react"; // Importing React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from React Redux
import { Link } from "react-router-dom"; // Importing Link component from React Router
import { cartData } from "../features/thunkApi"; // Importing cartData thunk action creator



const Navbar = () => {
    // Selecting cart data from the Redux store
    const { cart } = useSelector((state) => state.allCarts);
    const dispatch = useDispatch(); // Redux dispatch function

    // Effect hook to fetch cart data upon component mounting
    useEffect(() => {
        // Dispatching cartData action to fetch cart data
        dispatch(cartData());
    }, [dispatch]); // Dependency array to ensure the effect runs only once after mounting

    // Rendering JSX for the navigation bar
    return (
        <div className="">
            <nav className="navbar navbar-light bg-light justify-content-between fixed-top !bg-[#0d6efd] ">
                {/* Link to navigate to the "All Product" page */}
                <Link className="navbar-brand text-white" to="/">
                    All Product
                </Link>
                <form className="form-inline">
                    {/* Link to navigate to the "Cart" page */}
                    <Link to="/cart" className="navbar-brand text-white">
                        Cart: {""}{" "}
                        <span className="border p-1 rounded">
                            {/* Displaying the total quantity of items in the cart */}
                            {cart[0]?.totalQuantity ? cart[0]?.totalQuantity : "0"}
                        </span>
                    </Link>
                </form>
            </nav>
        </div>
    );
};

// Exporting the Navbar component as the default export
export default Navbar;
