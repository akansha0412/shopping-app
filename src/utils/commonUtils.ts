import axios, { AxiosInstance } from "axios";
import { QueryClient } from "react-query";

export const customAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    // Other common headers can be added here
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
