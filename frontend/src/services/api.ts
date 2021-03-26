//Imports
import axios, { AxiosRequestConfig } from "axios";
//App Imports
import config from "../config";
import { loadTOKEN } from "./storage";

const axiosConfig: AxiosRequestConfig = {
    baseURL: config.API,
    responseType: "json",
};

const token = loadTOKEN();
if (token) {
    axiosConfig.headers = { Authorization: `Bearer ${token}` };
}
export default axios.create(axiosConfig);
