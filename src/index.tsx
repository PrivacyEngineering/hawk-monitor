import React from "react";
import ReactDOM from "react-dom";
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "./store";
import {App} from "./layouts/App";

const store = configureStore();
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export const URL_BASE = process.env.REACT_APP_API_URL || "";
export const HEADER_JSON = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
