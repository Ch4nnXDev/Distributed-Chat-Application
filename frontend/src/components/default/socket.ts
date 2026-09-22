import { io } from "socket.io-client";


export const socket = io("http://localhost:8080", {
    path: "/chat/socket.io",
    withCredentials: true,
    transports: ["websocket"],
});

