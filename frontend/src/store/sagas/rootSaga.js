import { all, fork } from "redux-saga/effects";
import fetchDataSaga from "./fetchDataSaga";

export default function* rootSaga() {
  yield all([fork(fetchDataSaga)]);
}
