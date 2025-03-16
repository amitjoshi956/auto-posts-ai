import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError<unknown, InternalAxiosRequestConfig>) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('Response Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
