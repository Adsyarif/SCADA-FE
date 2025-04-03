import { token } from "@/config";
import axios from "axios";
import Cookies from "js-cookie";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
    baseURL : baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log(axiosInstance)
axiosInstance.interceptors.request.use(
    (config) => {
        const auth = Cookies.get(token);

        if (auth) { config.headers.Authorization = `Bearer ${auth}`;
        console.log('Token is saved:', auth);
        }  else {
            console.warn("token not found")
        } 
        return config;

    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
)