import { put, takeLatest } from "redux-saga/effects";
import { GET_CHAT_BOT_DATA } from "../actions/types";
import { API_HOST_URL } from "../../constants/constants";
import { setChatBotData } from "../actions/chatBotActions";

function* getChatBotData(action) {
  try {
    const url = API_HOST_URL + "/vector/query-helps";

    const response = yield fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();

    if (data.success && data.code === 200) {
      yield put(setChatBotData(1));
    }
  } catch (error) {
    console.error("API call failed:", error);
  }
}

export default function* fetchDataSaga() {
  yield takeLatest(GET_CHAT_BOT_DATA, getChatBotData);
}
