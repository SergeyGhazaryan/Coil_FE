import axios, { AxiosRequestConfig } from "axios";
import env from "../constants/env";
import localStorageKeys from "constants/localStorageKeys";
import { getItemFromLocalStorage } from "./localStorageService";

export const axiosInstance = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token: string | JSON = "";
    if (typeof window !== "undefined") {
      token = getItemFromLocalStorage(localStorageKeys.token);
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
