import axios from "axios";
const Axios_APIS = axios.create({
	baseURL: "https://shipping-cart-backend.onrender.com",
});

export default Axios_APIS;
