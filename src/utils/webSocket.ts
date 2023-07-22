// utils/webSocket.ts

import io from "socket.io-client";

// const socket = io();

const socket = io('http://localhost:3000/api/socket');

export default socket;
