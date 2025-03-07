import { all, fork } from "redux-saga/effects";
import fetchDataSaga from "./fetchDataSaga/fetchDataSaga";

export default function* rootSaga() {
  yield all([fork(fetchDataSaga)]);
}
