import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT, Headers, StorageKey } from '@base/const';
import { GenericAPIError } from '@base/type';

// Retrieve client-side data
const authToken = localStorage.getItem(StorageKey.AuthToken) || '';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    [Headers.ContentType]: 'application/json',
    ...(authToken && { [Headers.AuthToken]: authToken }),
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
  (response: AxiosResponse<any>) => {
    const authToken: string = response.headers[Headers.AuthToken] || '';
    if (authToken) {
      localStorage.setItem(StorageKey.AuthToken, authToken);
    }

    return response.data.data;
  },
  (error: AxiosError): GenericAPIError => {
    throw new Error(error.message);
  }
);

export default axiosInstance;
