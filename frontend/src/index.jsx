import "./index.css";
import store from "./store/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatComponent from "./components/ChatComponent";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ChatComponent />
    </Provider>
  </StrictMode>
);
