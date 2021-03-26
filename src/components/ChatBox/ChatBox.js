import React from "react";
import { useSocket } from "../../context/SocketContext";
import "./ChatBox.css";

export default function ChatBox() {
  const { socket } = useSocket();
  const [chatList, setChatList] = React.useState([]);

  if (socket) {
    socket.on("wrongGuess", ({ username, guess }) => {
      const newMessage = {
        username,
        guess,
      };
      const newChat = [...chatList];

      const chatLength = newChat.push(newMessage);

      if (chatLength >= 8) {
        newChat.shift();
      }
      setChatList(newChat);
    });
  }

  return (
    <div className="chatBox">
      {chatList.map((message, index) => (
        <div key={index}>
          <span>{message.username}: </span>
          <span>{message.guess}</span>
        </div>
      ))}
    </div>
  );
}
