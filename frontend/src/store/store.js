import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import rootSaga from "./sagas/rootSaga";
import rootReducer from "./reducers/index";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Middleware array
const middleware = [sagaMiddleware];

// Add logger middleware only in development mode
if (process.env.NODE_ENV === "development") {
  const logger = createLogger();
  middleware.push(logger);
}

// Configure store with reducer and middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware), // Disable thunk and add saga
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
