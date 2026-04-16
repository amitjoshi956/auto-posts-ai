import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@base/const';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT,
  withCredentials: true, // Sends httpOnly session cookie on every request
});

axiosInstance.interceptors.response.use(
  (response) => response.data.data,
  (error: AxiosError<{ error?: string }>) => {
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
);

export default axiosInstance;
