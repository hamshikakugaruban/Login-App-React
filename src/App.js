import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Register";
import Index from "./components/Index";
import { AUTHORIZION, TOKEN } from "./components/Constants/constant";
import History from "./components/Constants/History";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/index" component={Index} />
      </Switch>
    </div>
  );
}

export default App;
