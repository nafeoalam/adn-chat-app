// utils/webSocket.ts
import { io, Socket } from "socket.io-client";


const socket = io("http://localhost:3000", { path: "/api/socketio" });

export default socket;
