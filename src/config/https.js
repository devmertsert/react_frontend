import axios from "axios";
import configFile from '.';
import { getFromLocalStorage } from '../components/Services/user';

const axiosInstance = axios.create({
    baseURL: configFile.api_url,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getFromLocalStorage("accessToken");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;