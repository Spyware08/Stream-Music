import axios from "axios";
const API = axios.create({
    baseURL: "http://192.168.243.94:8080",
    timeout: 10000, // 10 seconds in milliseconds
    headers: {
        "Content-Type": "application/json",
        // You can add other headers as needed
    },
    withCredentials: true
});
export default API;
