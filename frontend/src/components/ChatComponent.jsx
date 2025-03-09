import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { getChatBotData } from "../store/actions/chatBotActions";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";

export default function ChatBot() {
  const dispatch = useDispatch();

  const messagesEnd = useRef(null);

  const [state, setState] = useState({
    isChatBoxOpen: false,
    chatBoxActiveTab: "chat",
    message: "",
    messageContext: [
      {
        text: "Hello! How can I help you?",
        sender: "bot",
        timestamp: new Date(),
      },
    ],
  });

  const { isChatBoxOpen, chatBoxActiveTab, message, messageContext } = state;

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: "user", timestamp: new Date() };

    setState((prevState) => ({
      ...prevState,
      message: "",
      messageContext: [...prevState.messageContext, newMessage],
    }));

    dispatch(getChatBotData({ query: message }));

    setTimeout(() => {
      const botReply = {
        text: "I'm here to assist you!",
        sender: "bot",
        timestamp: new Date(),
      };

      setState((prevState) => ({
        ...prevState,
        messageContext: [...prevState.messageContext, botReply],
      }));
    }, 1000);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageContext]);

  return (
    <section className="position-fixed bottom-0 start-0 p-3">
      {isChatBoxOpen && (
        <div
          className="d-flex flex-column border rounded shadow bg-white mb-3 justify-content-between"
          style={{ width: 500, height: 500 }}
        >
          <div className="text-center p-2 border-bottom">
            {chatBoxActiveTab.toUpperCase()}
          </div>

          {chatBoxActiveTab === "chat" && (
            <div className="d-flex h-100 flex-column flex-1 overflow-scroll p-2">
              {messageContext.map((msg, index) => (
                <div
                  key={index}
                  className={`w-100 d-flex align-items-center mb-2 ${
                    msg.sender === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="me-2 text-success">
                      <SmartToyOutlinedIcon />
                    </div>
                  )}
                  <div
                    className={`p-2 rounded ${
                      msg.sender === "user"
                        ? "bg-primary text-white border"
                        : "bg-light border"
                    }`}
                  >
                    <span>{msg.text}</span>
                    <div className="text-end" style={{ fontSize: "0.85rem" }}>
                      <small>{formatTimestamp(msg.timestamp)}</small>
                    </div>
                  </div>
                  {msg.sender === "user" && (
                    <div className="me-2 text-primary">
                      <PersonOutlinedIcon />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEnd} />
            </div>
          )}
          {chatBoxActiveTab === "chat" && (
            <div className="d-flex align-items-center border m-2 mt-0 rounded gap-2 p-2">
              <input
                type="text"
                value={message}
                placeholder="Type a message..."
                onChange={(e) =>
                  setState({ ...state, message: e.target.value })
                }
                className="rounded w-100 outline-none border-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <div onClick={sendMessage} className="cursor-pointer">
                <SendRoundedIcon />
              </div>
            </div>
          )}

          {chatBoxActiveTab === "help" && (
            <div className="d-flex flex-column h-100 flex-1 overflow-scroll p-2"></div>
          )}

          <div className="d-flex justify-content-center gap-2 border-top">
            {[
              { key: "chat", icon: <HomeOutlinedIcon /> },
              { key: "help", icon: <ContactSupportOutlinedIcon /> },
            ].map(({ key, icon }) => (
              <button
                key={key}
                className={`w-100 border-0 outline-0 bg-white py-3
                  ${chatBoxActiveTab === key ? "text-dark" : "text-muted"}`}
                onClick={() => setState({ ...state, chatBoxActiveTab: key })}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className="btn btn-primary d-flex gap-1 align-items-center"
        onClick={() => setState({ ...state, isChatBoxOpen: !isChatBoxOpen })}
      >
        <SearchOutlinedIcon />
        <span>Search</span>
      </button>
    </section>
  );
}
