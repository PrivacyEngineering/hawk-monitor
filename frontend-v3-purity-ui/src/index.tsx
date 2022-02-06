import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./layouts/App";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
