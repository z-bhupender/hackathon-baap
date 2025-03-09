import { GET_CHAT_BOT_DATA, SET_CHATBOT_DATA } from "./types";

export const getChatBotData = (obj) => {
  return {
    type: GET_CHAT_BOT_DATA,
    payload: obj,
  };
};

export const setChatBotData = (obj) => {
  return {
    type: SET_CHATBOT_DATA,
    payload: obj,
  };
};
