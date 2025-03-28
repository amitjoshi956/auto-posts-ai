import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError<unknown, InternalAxiosRequestConfig>) => {
    const reqErr = {
      hasErrors: true,
      error: error.message,
    };

    return reqErr;
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const resErr = {
      hasErrors: true,
      error: error.message,
    };

    return resErr;
  }
);

export default axiosInstance;
