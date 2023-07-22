// components/ChatComponent.tsx

import React, { useState, useEffect } from "react";
import socket from "../utils/webSocket";

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<
    { text: string; ownMessage?: boolean }[]
  >([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log({ socket });
    // Authenticate the WebSocket connection with the JWT token
    const token = localStorage.getItem("token"); // Assuming you store the JWT token in local storage after login
    if (token) {
      socket.emit("authenticate", { token });
    }

    // Listen for incoming chat messages
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log(message);
    // Send the message to the server
    socket.emit("chatMessage", { text: message });

    // Update the local messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, ownMessage: true },
    ]);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.ownMessage ? "You: " : "Other user: "}
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
