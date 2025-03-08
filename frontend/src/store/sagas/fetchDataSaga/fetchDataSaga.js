import { put, takeLatest } from "redux-saga/effects";
import { GET_CHAT_BOT_DATA } from "../../actions/types";
import { setChatBotData } from "../../actions/chatBotActions/chatBotactions";

function* getChatBotData(action) {
  try {
    const url = "https://hackathon-baap.onrender.com/query";

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

function* fetchDataSaga() {
  yield takeLatest(GET_CHAT_BOT_DATA, getChatBotData);
}

export default fetchDataSaga;
