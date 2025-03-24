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
      status: error.status,
    };

    return reqErr;
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return { ...response.data, status: response.status };
  },
  (error: AxiosError) => {
    const resErr = {
      hasErrors: true,
      error: error.message,
      status: error.status,
    };

    return resErr;
  }
);

export default axiosInstance;
