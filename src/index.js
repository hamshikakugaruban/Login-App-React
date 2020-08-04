import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, HashRouter } from "react-router-dom";
import Index from "./components/Index";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
