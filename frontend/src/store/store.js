import rootSaga from "./sagas/rootSaga";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";
import { ENVIRONMENT } from "../constants/constants";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (ENVIRONMENT === "development") {
  const logger = createLogger();
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware), // Disable thunk and add saga
});

sagaMiddleware.run(rootSaga);

export default store;
