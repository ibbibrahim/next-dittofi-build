"use client";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import reducer from "./redux/reducer.js";
import myMiddleware from "./redux/middleware.js";
import { api } from "./api/rtkQuery.js";
import mainSaga from "./sagas/saga.js";
import { Provider } from "react-redux";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(myMiddleware, sagaMiddleware, thunk, api.middleware)
);
sagaMiddleware.run(mainSaga);

function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default StoreProvider;
