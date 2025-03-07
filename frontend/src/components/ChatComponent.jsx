import React from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const ChatComponent = () => {
  return (
    <MessageBox
      position={"left"}
      type={"text"}
      text={"Hello! This is a chat message."}
      date={new Date()}
    />
  );
};

export default ChatComponent;