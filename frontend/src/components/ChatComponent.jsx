import React, { useState, useRef } from "react";
import styles from "./ChatBotComponent.module.css";
import { FaSearch } from "react-icons/fa"; // Importing search icon

const ChatBotComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "User", content: inputText };
    const botMessage = { sender: "Chat", content: "I received your message!" };

    setMessages([...messages, userMessage, botMessage]);
    setInputText("");
  };

  const handleEmojiSelect = (emoji) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileMessage = {
        sender: "User",
        content: `📎 Sent a file: ${file.name}`,
      };
      setMessages([...messages, fileMessage]);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Search Button to Open Chat */}
      {!isChatOpen && (
        <button className={styles.searchButton} onClick={() => setIsChatOpen(true)}>
          <FaSearch className={styles.searchIcon} /> Search Chat
        </button>
      )}

      {/* Chat Box */}
      {isChatOpen && (
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <span>Chat Bot</span>
            <button onClick={() => setIsChatOpen(false)} className={styles.closeButton}>✖</button>
          </div>

          {/* Chat Display */}
          <div className={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender === "User" ? styles.userMessage : styles.botMessage
                }`}
              >
                <strong>{msg.sender}: </strong> {msg.content}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
            {showEmojiPicker && (
              <div className={styles.emojiPicker}>
                {["😀", "😂", "😍", "😎", "🤔", "😢", "👏"].map((emoji) => (
                  <span
                    key={emoji}
                    onClick={() => handleEmojiSelect(emoji)}
                    className={styles.emoji}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className={styles.input}
            />
            <input type="file" onChange={handleFileUpload} ref={fileInputRef} style={{ display: "none" }} />
            <button onClick={() => fileInputRef.current.click()}>📎</button>
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotComponent;
