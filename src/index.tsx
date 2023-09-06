import React from "react";
import ReactDOM from "react-dom";
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "./store";
import {App} from "./layouts/App";

const store = configureStore();
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export let URL_BASE = "";
export const HEADER_JSON = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const fetchApiUrl = async () => {
    const url = process.env.REACT_APP_API_URL;
    if (!url) {
        try {
            const meta = await fetch("api.json").then(r => r.json())
            if (meta?.apiUrl) {
                return meta.apiUrl;
            }
        } catch (e) {
            console.error("failed to fetch api url from api.json", e);
        }
    }
    return url;
}

fetchApiUrl().then(url => {
    console.log("fetched api url: ", url);
    URL_BASE = url;

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
});