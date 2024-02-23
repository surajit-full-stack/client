
// Define the URL of the WebSocket server
const port = 4000 +Math.floor(Math.random() * 4);
// const port =4000;
export const serverUrl = `${import.meta.env.VITE_SOCKET_HOST}:${port}`;

