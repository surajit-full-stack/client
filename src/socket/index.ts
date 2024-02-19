import io from "socket.io-client";

// Define the URL of the WebSocket server
const port = 4000 + Math.floor(Math.random() * 4);
const serverUrl = `${import.meta.env.VITE_SOCKET_HOST}:${port}`;
console.log("socket server", port);
const _socket = io(serverUrl);
export default _socket;
