import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@base/const';
import { GenericAPIError } from '@base/type';
import * as Headers from '@base/config/headers.json';

// Retrieve client-side data
const authToken = localStorage.getItem('authToken') || '';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    [Headers.ContentType]: 'application/json',
    [Headers.AuthToken]: authToken,
  },
  timeout: API_TIMEOUT,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError): GenericAPIError => {
    throw new Error(error.message);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError): GenericAPIError => {
    throw new Error(error.message);
  }
);

export default axiosInstance;
