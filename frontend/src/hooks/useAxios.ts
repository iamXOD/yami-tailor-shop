// Imports
import axios, { AxiosInstance } from "axios";
// App Imports
import config from "../config";
import { useUser } from "../user";

export function useAxios(): AxiosInstance {
    const { token } = useUser();

    return axios.create({
        baseURL: config.API,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
        },
    });
}
