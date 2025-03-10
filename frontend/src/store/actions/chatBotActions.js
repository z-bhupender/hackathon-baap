import {
  GET_CHAT_BOT_DATA,
  SET_CHATBOT_DATA,
  GET_GPT_DATA,
  SET_GPT_DATA,
} from "./types";

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

export const getGPTData = (obj) => {
  return {
    type: GET_GPT_DATA,
    payload: obj,
  };
};

export const setGPTData = (obj) => {
  return {
    type: SET_GPT_DATA,
    payload: obj,
  };
};
