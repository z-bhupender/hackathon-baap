import { GET_CHAT_BOT_DATA } from "../types";

export const getChatBotData = (obj) => {
  return {
    type: GET_CHAT_BOT_DATA,
    payload: obj,
  };
};
