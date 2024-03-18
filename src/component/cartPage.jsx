import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartData, deleteCart } from "../features/thunkApi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
	const { cart } = useSelector((state) => state.allCarts);
	const dispatch = useDispatch(); //
	const navigate = useNavigate(); //Use for routing
	const totalQuantity1 = cart.reduce((total, item) => total + item.quantity, 0);// Calculate cart quantity
	

	//Calculate total cart product price 
	const totalPrice = cart.reduce(
		(total, item) => total + item.quantity * item.data.price,
		0
	);

	// Fetch cart data when page render
	useEffect(() => {
		dispatch(cartData());
	}, []);


	// Function for increase cart Quantity
	const increase_cart_qnt = async (id) => {
		try {
			
			// Call increase Cart quantity api
			const response = await axios.post(
				"http://localhost:8081/increaseCartQnt",
				{
					_id: id._id,
					quantity: 1,
				}
			);
			 
			// If api response is success then update cart quantity
			if (response?.status === 200) {
				dispatch(cartData());
			}
			
		} catch (error) {
			console.log(error, "error");
		}
	};

	// Function for decrease cart Quantity
	const decrease_cart_qnt = async (id) => {
		try {

			// Call increase Cart quantity api
			const response = await axios.post(
				"http://localhost:8081/decreaseCartQnt",
				{
					_id: id._id,
					quantity: 1,
				}
			);
			// If api response is success then update cart quantity
			if (response?.status === 200) {
				dispatch(cartData());
			}
		} catch (error) {
			console.log(error, "error");
		}
	};
	// Handle go to checkout button
	const handleCheckout = () => {
		dispatch(deleteCart());
		dispatch(cartData());
		navigate("/placeorder");
	};

	return (
		<>
			<div>
				<section className="h-100 gradient-custom">
					<div className="container py-5">
						<div className="row d-flex justify-content-center my-4 ">
							<div className="col-md-8">
								<div className="card mb-4">
									<div className="card-header py-3">
										<h5 className="mb-0">CartItems</h5>
									</div>
									<div className="card-body">
										{cart.length > 0 ? (
											<>
												{cart?.map((data) => {
													console.log(data, "data");
													return (
														<>
															<div className="row" key={data._id}>
																<div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
																	<div
																		className="bg-image hover-overlay hover-zoom ripple rounded"
																		data-mdb-ripple-color="light"
																	>
																		<img
																			src={
																				isValidUrl(data.data.image)
																					? data.data.image
																					: `http://localhost:8081/${data.data.image}`
																			}
																			className="w-100"
																			alt="Blue Jeans Jacket"
																		/>
																	</div>
																</div>

																<div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
																	<p>
																		<strong>{data.data.description}</strong>
																	</p>
																</div>

																<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
																	<div
																		className="d-flex mb-4"
																		style={{ maxWidth: "300px" }}
																	>
																		<button className="btn btn-primary px-3 me-2">
																			<i
																				className="fas fa-minus"
																				onClick={() => decrease_cart_qnt(data)}
																			></i>
																		</button>

																		<div className="form-outline">
																			<input
																				id="form1"
																				min="0"
																				name="quantity"
																				value={data.quantity}
																				type="number"
																				className="form-control"
																			/>
																			<label className="form-label" for="form1">
																				Quantity
																			</label>
																		</div>

																		<button className="btn btn-primary px-3 ms-2">
																			<i
																				className="fas fa-plus"
																				onClick={() => increase_cart_qnt(data)}
																			></i>
																		</button>
																	</div>

																	<p className="text-start text-md-center">
																		<strong>Price : ${data.data.price}</strong>
																	</p>
																</div>
																<hr className="my-4" />
															</div>
														</>
													);
												})}
											</>
										) : (
											"Cart is Empty"
										)}
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="card mb-4">
									<div className="card-header py-3">
										<h5 className="mb-0">Summary</h5>
									</div>
									<div className="card-body">
										<ul className="list-group list-group-flush">
											<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
												Total Quantity
												<span>{totalQuantity1}</span>
											</li>

											<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
												<div>
													<strong>Total amount</strong>
												</div>
												<span>
													<strong>{totalPrice}</strong>
												</span>
											</li>
										</ul>

										<button
											onClick={handleCheckout}
											type="button"
											className="btn btn-primary btn-lg btn-block text-gray-500 hover:!text-white"
										>
											Go to checkout
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

// Function for check image url is valid or not
function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch (error) {
		return false;
	}
}
export default Cart;
