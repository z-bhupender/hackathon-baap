import axios from "axios";
import { useDispatch } from "react-redux";
import { API_HOST_URL } from "../constants/constants";
import React, { useState, useRef, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { getChatBotData, getGPTData } from "../store/actions/chatBotActions";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
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
        content: "Hello! How can I help you?",
        role: "assistant",
        timestamp: new Date(),
      },
    ],
    helps: {},
    searchHelp: "",
    selectedDashboard: null,
    searchTitle: "",
    selectedQuestion: null,
  });

  useEffect(() => {
    const url = API_HOST_URL + "/vector/list-helps";
    axios
      .get(url)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          helps: response.data.data,
        }));
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  const {
    isChatBoxOpen,
    chatBoxActiveTab,
    message,
    messageContext,
    helps,
    searchHelp,
    selectedDashboard,
    searchTitle,
    selectedQuestion,
  } = state;

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setState((prevState) => ({
      ...prevState,
      message: "",
      messageContext: [...prevState.messageContext, newMessage],
    }));

    // Create messageContext for request
    let requestMessageContext = messageContext
      .map((message) => {
        return {
          role: message.role,
          content: message.content,
        };
      })
      .slice(1);
    requestMessageContext.push({
      content: message,
      role: "user",
    });
    if (
      requestMessageContext.length !== 0 &&
      requestMessageContext[requestMessageContext.length - 1].role ===
        "function"
    ) {
      requestMessageContext = [];
    }

    const url = API_HOST_URL + "/function-call/help";
    axios
      .post(url, { messages: requestMessageContext })
      .then((response) => {
        let message = response.data;
        if (message.role === "function") {
          if (message.name === "getCalls") {
            message = {
              role: "assistant",
              content: `Call IDs for the given agent are: ${message.content
                .map((call) => call.callid)
                .join(", \n")}`,
            };
          }
        }
        setState((prevState) => ({
          ...prevState,
          messageContext: [
            ...prevState.messageContext,
            { ...message, timestamp: new Date().toLocaleString() },
          ],
          message: "",
        }));
      })
      .catch((error) => {
        console.error("API call failed:", error);
        setState((prevState) => ({
          ...prevState,
          messageContext: [
            ...prevState.messageContext,
            {
              role: "assistant",
              content: "Something went wrong. Please try again.",
              timestamp: new Date().toLocaleString(),
            },
          ],
        }));
      });
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageContext]);

  const goBack = () => {
    if (selectedQuestion) {
      setState({ ...state, selectedQuestion: null });
    } else if (selectedDashboard) {
      setState({ ...state, selectedDashboard: null, searchTitle: "" });
    }
  };

  const debouncedSearchHelp = useRef(null);

  useEffect(() => {
    if (!searchHelp) return;
    debouncedSearchHelp.current = setTimeout(() => {
      const url = API_HOST_URL + "/vector/query-helps";
      axios
        .post(url, { query: searchHelp })
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            helps: response?.data?.data,
            searchHelp: "",
          }));
        })
        .catch((error) => {
          console.error("API call failed:", error);
        });
    }, 1000);
  }, [searchHelp]);

  return (
    <section className="position-fixed bottom-0 start-0 p-3">
      {isChatBoxOpen && (
        <div
          className="d-flex flex-column border rounded shadow bg-white mb-3 justify-content-between"
          style={{ width: 500, height: 500 }}
        >
          <div className="text-center p-2 border-bottom position-relative">
            {selectedDashboard || selectedQuestion ? (
              <button
                onClick={goBack}
                className="btn btn-link p-0 me-2 position-fixed start-0 ms-4"
              >
                <ArrowBackIcon />
              </button>
            ) : null}
            {chatBoxActiveTab.toUpperCase()}
          </div>

          {chatBoxActiveTab === "chat" && (
            <div className="d-flex h-100 flex-column flex-1 overflow-scroll p-2">
              {messageContext.map((msg, index) => (
                <div
                  key={index}
                  className={`w-100 d-flex align-items-center mb-2 ${
                    msg.role === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="me-2 text-success">
                      <SmartToyOutlinedIcon />
                    </div>
                  )}
                  <div
                    className={`p-2 mw-70 rounded ${
                      msg.role === "user"
                        ? "bg-primary text-white border"
                        : "bg-light border"
                    }`}
                  >
                    <span>{msg.content}</span>
                    <div className="text-end" style={{ fontSize: "0.85rem" }}>
                      <small>{formatTimestamp(msg.timestamp)}</small>
                    </div>
                  </div>
                  {msg.role === "user" && (
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
            <div className="d-flex flex-column h-100 flex-1 overflow-scroll p-2">
              {/* Search Dashboards */}
              {!selectedDashboard && (
                <>
                  <div className="d-flex align-items-center border mb-2 rounded gap-2 p-2">
                    <SearchOutlinedIcon />
                    <input
                      type="text"
                      value={searchHelp}
                      placeholder="Search Dashboards"
                      onChange={(e) =>
                        setState({ ...state, searchHelp: e.target.value })
                      }
                      className="rounded w-100 outline-none border-0"
                    />
                  </div>

                  {Object.keys(helps)
                    .filter((dashboard) =>
                      dashboard.toLowerCase().includes(searchHelp.toLowerCase())
                    )
                    .map((dashboard, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between border p-2 rounded mb-2 cursor-pointer"
                        onClick={() =>
                          setState({
                            ...state,
                            selectedDashboard: dashboard,
                            searchTitle: "",
                            selectedQuestion: null,
                          })
                        }
                      >
                        <span>{dashboard}</span>
                        <KeyboardArrowRightIcon />
                      </div>
                    ))}
                </>
              )}

              {/* Search and Display Questions */}
              {selectedDashboard && !selectedQuestion && (
                <>
                  <div className="d-flex align-items-center border mb-2 rounded gap-2 p-2">
                    <SearchOutlinedIcon />
                    <input
                      type="text"
                      value={searchTitle}
                      placeholder="Search Questions"
                      onChange={(e) =>
                        setState({ ...state, searchTitle: e.target.value })
                      }
                      className="rounded w-100 outline-none border-0"
                    />
                  </div>

                  {helps[selectedDashboard]
                    .filter(({ title }) =>
                      title.toLowerCase().includes(searchTitle.toLowerCase())
                    )
                    .map(({ title, content }, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between border p-2 rounded mb-2 cursor-pointer"
                        onClick={() =>
                          setState({
                            ...state,
                            selectedQuestion: { title, content },
                          })
                        }
                      >
                        <span>{title}</span>
                        <KeyboardArrowRightIcon />
                      </div>
                    ))}
                </>
              )}

              {/* Display Answer */}
              {selectedQuestion && (
                <div className="p-3">
                  <h5>{selectedQuestion.title}</h5>
                  <p>{selectedQuestion.content}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
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
