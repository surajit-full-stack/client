import axios from "axios";

const headersList = {
  Accept: "*/*",
  "Content-Type": "application/json",
};
console.log("VITE_SERVER_IP", import.meta.env.VITE_SERVER_IP);
export const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_IP + "api/user/", // Replace with your API base URL
  timeout: 10000, // Set the timeout for requests (in milliseconds)
  headers: headersList,
});
