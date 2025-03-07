import { all, takeLatest, call, put } from "redux-saga/effects";

// Simulating an API call
const fetchDataFromAPI = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(["Item 1", "Item 2"]), 1000)
  );

function* fetchDataSaga() {
  try {
    const data = yield call(fetchDataFromAPI);
    yield put({ type: "FETCH_DATA_SUCCESS", payload: data });
  } catch (error) {
    yield put({ type: "FETCH_DATA_FAILURE" });
  }
}

function* watchFetchData() {
  yield takeLatest("FETCH_DATA_REQUEST", fetchDataSaga);
}

export default function* rootSaga() {
  yield all([watchFetchData()]);
}
