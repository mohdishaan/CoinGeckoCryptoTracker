import { COINGECKO_API_URL } from "./Constants";
import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: COINGECKO_API_URL
});

export default AxiosInstance;