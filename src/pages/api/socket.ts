// pages/api/socket.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const secretKey = "your-secret-key"; // Replace this with a secure secret key in production

export const config = {
  api: {
    bodyParser: false, // Disabling bodyParser to handle WebSocket handshake
  },
};

export default function handler(req: any, res: NextApiResponse) {
  console.log('handler');
  if (req.method === "POST") {
    // Authenticate the WebSocket connection with the JWT token
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, secretKey) as { userId: number };
      const io = new Server().attach(req.socket.server);

      // Store the authenticated user ID in the socket for later use
      (req.socket as any).userId = decoded.userId;

      io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Handle incoming chat messages
        socket.on("chatMessage", (message) => {
          console.log("Received message:", message);
          io.emit("chatMessage", message);
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
      });

      res.status(200).json({ message: "WebSocket connection established" });
    } catch (err: any) {
      console.log("Invalid token:", err.message);
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
