import { put, takeLatest } from "redux-saga/effects";
import axios from "../../../utils/axiosUtilsV2/axiosUtilsV2";
import { GET_CHAT_BOT_DATA } from "../../actions/types";

function* getChatBotData(action) {
  try {
    let url = "p:calibration-assignment/create-calibration-assignment";

    const axiosRes = yield axios.post(url, { ...action.payload });
    const response = axiosRes.data;

    if (response.success && response.code === 200) {
      yield put(getAssignmentStatus(1));
    }
    if (response.success === false) {
    }
  } catch (e) {}
}

function* fetchDataSaga() {
  yield takeLatest(GET_CHAT_BOT_DATA, getChatBotData);
}

export default fetchDataSaga;
