import axios, { AxiosError } from "axios";
import { theState } from "../state";
import { useNavigate } from "react-router-dom";
const headersList = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

export const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_IP + "api/user/", // Replace with your API base URL
  timeout: 10000, // Set the timeout for requests (in milliseconds)
  headers: headersList,
});

http.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        throw refreshError;
      }
    }

    // If the error is not due to expired token, just rethrow the error
    throw error;
  }
);

const refreshToken = async () => {
  try {
    await http.get("auth/refreash-token", { withCredentials: true });
  } catch (error: AxiosError | any) {
    if (error?.response?.status === 440) {
     theState.getState().loggedOut()
     const navigate = useNavigate();
     navigate("/log-in")
    }
    console.log("error", error);
  }
};
