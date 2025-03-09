import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";
import {
  FaSearch,
  FaPaperclip,
  FaSmile,
  FaUser,
  FaRobot,
} from "react-icons/fa";
import { IoSend, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiHome6Fill } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";

import { useDispatch } from "react-redux";
import { getChatBotData } from "../store/actions/chatBotActions/chatBotactions";

const ChatBot = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  // const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(getChatBotData(input));
  }, []);

  const toggleChatBox = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user", timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");

    dispatch(
      getChatBotData({
        query: input,
      })
    );

    setTimeout(() => {
      const botReply = {
        text: "I'm here to assist you!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  // const handleFileChange = (event) => {
  //   const uploadedFile = event.target.files[0];
  //   if (uploadedFile) {
  //     const fileMessage = { text: `📎 ${uploadedFile.name}`, sender: "user", timestamp: new Date() };
  //     setMessages([...messages, fileMessage]);
  //   }
  // };

  // const addEmoji = (emoji) => setInput(input + emoji);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.heading}>
            {activeTab === "chat" ? (
              <>
                <IoChatbubbleEllipsesSharp />
                Chat
              </>
            ) : (
              <>
                <IoIosHelpCircleOutline className={styles.tabIcon} />
                Help
              </>
            )}
          </div>

          {activeTab === "chat" && (
            <div className={styles.chatContent}>
              <div className={styles.messages}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.messageWrapper} ${
                      msg.sender === "user"
                        ? styles.userWrapper
                        : styles.botWrapper
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <FaUser className={styles.userIcon} />
                    ) : (
                      <FaRobot className={styles.botIcon} />
                    )}
                    <div
                      className={`${styles.message} ${
                        msg.sender === "user"
                          ? styles.userMessage
                          : styles.botMessage
                      }`}
                    >
                      {msg.text}
                      <div className={styles.timestamp}>
                        {formatTimestamp(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles.inputArea}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className={styles.input}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <button onClick={sendMessage} className={styles.sendButton}>
                  <IoSend className={styles.sendIcon} />
                </button>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className={styles.helpContent}>
              <p>Need help? Check out these resources:</p>
              <ul>
                <li>
                  <a
                    href="https://example.com/help1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="https://example.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className={styles.tabs}>
            <button
              className={activeTab === "chat" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("chat")}
            >
              <RiHome6Fill className={styles.tabIcon} />
            </button>
            <button
              className={activeTab === "help" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("help")}
            >
              <IoIosHelpCircleOutline className={styles.tabIcon} />
            </button>
          </div>
        </div>
      )}

      <button className={styles.searchButton} onClick={toggleChatBox}>
        <FaSearch className={styles.searchIcon} /> Search
      </button>
    </div>
  );
};

export default ChatBot;
