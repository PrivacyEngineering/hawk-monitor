import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { HashRouter } from "react-router-dom";
import { configureStore } from "./store";
import { App } from "./layouts/App";

const store = configureStore();
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export const URL_BASE = process.env.API_URL;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
